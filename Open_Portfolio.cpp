#include <windows.h>
#include <shellapi.h>
#include <iostream>
#include <string>

int main() {
    // Get current directory of exe
    wchar_t buffer[MAX_PATH];
    GetModuleFileNameW(NULL, buffer, MAX_PATH);
    std::wstring path(buffer);
    size_t pos = path.find_last_of(L"\\/");
    std::wstring dir = (pos != std::wstring::npos) ? path.substr(0, pos) : L".";
    std::wstring indexPath = dir + L"\\index.html";

    // 1. Start Python HTTP Server in background if available
    std::wstring serverCmd = L"/c cd /d \"" + dir + L"\" && start /min python -m http.server 8080";
    ShellExecuteW(NULL, L"open", L"cmd.exe", serverCmd.c_str(), NULL, SW_HIDE);

    // Sleep 800ms for server startup
    Sleep(800);

    // 2. Open Localhost in Default Browser
    ShellExecuteW(NULL, L"open", L"http://localhost:8080", NULL, NULL, SW_SHOWNORMAL);

    return 0;
}
