#!/bin/bash
echo "🎯 ФИНАЛЬНАЯ ПРОВЕРКА GH-PAGES"
echo "=============================="

echo ""
echo "1. 📁 ПРОВЕРКА СТРУКТУРЫ:"
git checkout gh-pages
echo "Файлы в корне:"
ls -la | grep -E "(index.html|assets|.nojekyll)"
echo ""
echo "Пути в index.html:"
grep -o 'src="[^"]*' index.html

echo ""
echo "2. 🌐 ПРОВЕРКА ДОСТУПНОСТИ:"
echo "Откройте: https://bair2503.github.io/RIP-frontend/"
echo "Если пусто - F12 → Console → ошибки"

echo ""
echo "3. 🔙 ВОЗВРАТ:"
git checkout feature/Lab6

echo ""
echo "✅ ЕСЛИ ВСЕ ПРАВИЛЬНО:"
echo "   - Файлы в корне (не в dist/)"
echo "   - Пути: /assets/..."
echo "   - GitHub Pages показывает приложение"
