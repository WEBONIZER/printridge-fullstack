# PowerShell скрипт для установки ffmpeg на Windows

Write-Host "Проверка наличия ffmpeg..." -ForegroundColor Cyan

if (Get-Command ffmpeg -ErrorAction SilentlyContinue) {
    Write-Host "✅ FFmpeg уже установлен" -ForegroundColor Green
    ffmpeg -version | Select-Object -First 1
    exit 0
}

Write-Host "FFmpeg не найден. Попытка установки..." -ForegroundColor Yellow

# Проверяем наличие Chocolatey
if (Get-Command choco -ErrorAction SilentlyContinue) {
    Write-Host "Установка через Chocolatey..." -ForegroundColor Cyan
    choco install ffmpeg -y
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ FFmpeg успешно установлен через Chocolatey!" -ForegroundColor Green
        ffmpeg -version | Select-Object -First 1
        exit 0
    }
}

# Проверяем наличие Scoop
if (Get-Command scoop -ErrorAction SilentlyContinue) {
    Write-Host "Установка через Scoop..." -ForegroundColor Cyan
    scoop install ffmpeg
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ FFmpeg успешно установлен через Scoop!" -ForegroundColor Green
        ffmpeg -version | Select-Object -First 1
        exit 0
    }
}

Write-Host "❌ Не удалось установить автоматически." -ForegroundColor Red
Write-Host "Установите вручную:" -ForegroundColor Yellow
Write-Host "1. Скачайте с https://ffmpeg.org/download.html" -ForegroundColor Yellow
Write-Host "2. Распакуйте и добавьте в PATH" -ForegroundColor Yellow
Write-Host "Или установите Chocolatey: https://chocolatey.org/install" -ForegroundColor Yellow
Write-Host "Или установите Scoop: https://scoop.sh" -ForegroundColor Yellow
exit 1

