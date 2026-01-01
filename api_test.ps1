$ErrorActionPreference = "Stop"
$baseUrl = "http://localhost:8080/api"
$email = "apitest_" + (Get-Date -Format "yyyyMMddHHmmss") + "@example.com"
$headers = @{ "Content-Type" = "application/json" }

Write-Host "`n--- CHEF CONNECT API TEST SUITE ---" -ForegroundColor Cyan
Write-Host "Target: $baseUrl"
Write-Host "Test User: $email"

# 1. Register
Write-Host "`n[1] Registering User..." -ForegroundColor Yellow
$regBody = @{ 
    name = "Api Tester"
    email = $email
    password = "password"
    role = "USER"
} | ConvertTo-Json

try {
    $regResponse = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $regBody -Headers $headers
    Write-Host "SUCCESS: Registered User ID $($regResponse.userId)" -ForegroundColor Green
} catch {
    Write-Host "FAILED to Register: $_" -ForegroundColor Red
    exit 1
}

# 2. Login
Write-Host "`n[2] Logging In..." -ForegroundColor Yellow
$loginBody = @{ 
    email = $email
    password = "password"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $loginBody -Headers $headers
    $token = $loginResponse.token
    if (-not $token) { throw "No token returned" }
    $userId = $loginResponse.userId
    
    # Add Token to future requests
    $headers.Add("Authorization", "Bearer $token")
    Write-Host "SUCCESS: Logged In. Token prefix: $($token.Substring(0,10))..." -ForegroundColor Green
} catch {
    Write-Host "FAILED to Login: $_" -ForegroundColor Red
    exit 1
}

# 3. Get Me
Write-Host "`n[3] Get Current Profile (/auth/me)..." -ForegroundColor Yellow
try {
    $me = Invoke-RestMethod -Uri "$baseUrl/auth/me" -Method Get -Headers $headers
    if ($me.email -eq $email) {
        Write-Host "SUCCESS: Profile Verified ($($me.name))" -ForegroundColor Green
    } else {
        Write-Error "Profile Mismatch"
    }
} catch {
    Write-Host "FAILED to get profile: $_" -ForegroundColor Red
}

# 4. Update Profile
Write-Host "`n[4] Update Profile (Name & Image)..." -ForegroundColor Yellow
$updateBody = @{ 
    name = "Updated Tester"
    imageUrl = "https://example.com/avatar.png" 
} | ConvertTo-Json

try {
    # Check if UserController uses /api/users/{id}
    $updated = Invoke-RestMethod -Uri "$baseUrl/users/$userId" -Method Put -Body $updateBody -Headers $headers
    if ($updated.name -eq "Updated Tester") {
        Write-Host "SUCCESS: Name updated to 'Updated Tester'" -ForegroundColor Green
    } else {
        Write-Error "Name update failed"
    }
} catch {
    Write-Host "FAILED to update profile: $_" -ForegroundColor Red
}

# 5. Add Address
Write-Host "`n[5] Add Address..." -ForegroundColor Yellow
$addrBody = @{ 
    userId = $userId
    street = "123 Test St"
    city = "Test City"
    state = "TS"
    zipCode = "12345"
    isDefault = $true 
} | ConvertTo-Json

try {
    $addr = Invoke-RestMethod -Uri "$baseUrl/addresses" -Method Post -Body $addrBody -Headers $headers
    Write-Host "SUCCESS: Address Added (ID: $($addr.id))" -ForegroundColor Green
} catch {
    Write-Host "FAILED to add address: $_" -ForegroundColor Red
    # Continue to next test
}

# 6. List Chefs
Write-Host "`n[6] List Chefs..." -ForegroundColor Yellow
try {
    $chefs = Invoke-RestMethod -Uri "$baseUrl/chefs" -Method Get -Headers $headers
    Write-Host "SUCCESS: Found $($chefs.Count) chefs" -ForegroundColor Green
    if ($chefs.Count -gt 0) {
        Write-Host "First Chef: $($chefs[0].name)" -ForegroundColor DarkGray
    }
} catch {
    Write-Host "FAILED to list chefs: $_" -ForegroundColor Red
}

Write-Host "`n--- TEST SUITE COMPLETED ---" -ForegroundColor Cyan
