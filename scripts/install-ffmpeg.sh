#!/bin/bash

# Скрипт для установки ffmpeg на разных системах

echo "Проверка наличия ffmpeg..."

if command -v ffmpeg &> /dev/null; then
    echo "✅ FFmpeg уже установлен"
    ffmpeg -version | head -n 1
    exit 0
fi

echo "FFmpeg не найден. Начинаем установку..."

# Определяем ОС
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if command -v apt-get &> /dev/null; then
        echo "Установка через apt-get (Ubuntu/Debian)..."
        sudo apt-get update
        sudo apt-get install -y ffmpeg
    elif command -v yum &> /dev/null; then
        echo "Установка через yum (CentOS/RHEL)..."
        sudo yum install -y ffmpeg
    elif command -v dnf &> /dev/null; then
        echo "Установка через dnf (Fedora)..."
        sudo dnf install -y ffmpeg
    else
        echo "❌ Не удалось определить пакетный менеджер. Установите ffmpeg вручную."
        exit 1
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if command -v brew &> /dev/null; then
        echo "Установка через Homebrew (macOS)..."
        brew install ffmpeg
    else
        echo "❌ Homebrew не найден. Установите Homebrew или ffmpeg вручную."
        exit 1
    fi
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    echo "Для Windows:"
    echo "1. Скачайте ffmpeg с https://ffmpeg.org/download.html"
    echo "2. Распакуйте и добавьте в PATH"
    echo "Или используйте Chocolatey: choco install ffmpeg"
    echo "Или используйте Scoop: scoop install ffmpeg"
    exit 1
else
    echo "❌ Неподдерживаемая ОС. Установите ffmpeg вручную."
    exit 1
fi

# Проверяем установку
if command -v ffmpeg &> /dev/null; then
    echo "✅ FFmpeg успешно установлен!"
    ffmpeg -version | head -n 1
else
    echo "❌ Ошибка установки FFmpeg"
    exit 1
fi

