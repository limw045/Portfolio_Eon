@echo off
chcp 65001 >nul
title 部署更新至 Cloudflare Pages

echo ===================================================
echo   🚀 正在上传并部署更新至 Cloudflare Pages...
echo ===================================================
echo.


npx -y wrangler pages deploy . --project-name=weijian-portfolio --branch=main --commit-dirty=true

echo.
echo ===================================================
echo   ✨ 部署完成！请访问: https://weijian-portfolio.pages.dev
echo ===================================================
echo.
pause
