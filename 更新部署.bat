@echo off
chcp 65001 >nul
title 编译并部署 Astro 项目至 Cloudflare Pages

echo ===================================================
echo   🚀 正在编译 Astro SSG 静态产物...
echo ===================================================
echo.

call npx -y astro build

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Astro 编译失败，终止上传。
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo   🌎 正在上传并部署 dist/ 至 Cloudflare Pages...
echo ===================================================
echo.

call npx -y wrangler pages deploy dist --project-name=weijian-portfolio --branch=main --commit-dirty=true

echo.
echo ===================================================
echo   ✨ 部署完成！请访问: https://weijian-portfolio.pages.dev
echo ===================================================
echo.
pause
