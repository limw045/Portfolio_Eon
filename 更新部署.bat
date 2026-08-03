@echo off
chcp 65001 >nul
title 部署更新至 Cloudflare Pages

echo ===================================================
echo   🚀 正在上传并部署更新至 Cloudflare Pages...
echo ===================================================
echo.

rem 请在运行此脚本前，通过环境变量提供 CLOUDFLARE_API_TOKEN。
if not defined CLOUDFLARE_API_TOKEN if not exist ".env" (
    echo [错误] 未检测到 CLOUDFLARE_API_TOKEN 环境变量。
    echo 请设置环境变量或在项目根目录创建 .env 后再重试。
    pause
    exit /b 1
)

if exist ".env" (
    npx -y wrangler pages deploy . --project-name=weijian-portfolio --branch=main --commit-dirty=true --env-file .env
) else (
    npx -y wrangler pages deploy . --project-name=weijian-portfolio --branch=main --commit-dirty=true
)

if errorlevel 1 (
    echo [错误] 部署失败。
    exit /b 1
)

echo.
echo ===================================================
echo   ✨ 部署完成！请访问: https://weijian-portfolio.pages.dev
echo ===================================================
echo.
pause
