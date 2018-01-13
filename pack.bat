SET CHROME=C:\Progra~2\Google\Chrome\Application\chrome.exe
SET WRKDIR=E:\Dev\mcast-attendance-extension\

if exist %WRKDIR%src.pem (
    %CHROME% --pack-extension=%WRKDIR%src --pack-extension-key=%WRKDIR%src.pem
) else (
	%CHROME% --pack-extension=%WRKDIR%src 
)

if exist src.crx (
	rename src.crx mcast-attendance-helper-local.crx
	move mcast-attendance-helper-local.crx %WRKDIR%bin
)

pause