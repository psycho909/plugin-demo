# .NET Core + Vite Vue 專案設置指南

## 目錄

1. [專案結構](#專案結構)
2. [開發環境設置](#開發環境設置)
3. [Vite 配置](#vite-配置)
4. [.NET Core 配置](#net-core-配置)
5. [開發流程](#開發流程)
6. [生產部署](#生產部署)
7. [常見問題](#常見問題)

## 專案結構

```
WebApplication2/
├── Pages/
│   ├── Index.cshtml
│   └── Index.cshtml.cs
├── wwwroot/
│   └── assets/        # Vite 打包後的檔案
├── vite-project/      # Vue 專案
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── Program.cs
```

## 開發環境設置

### 1. 安裝必要工具

```bash
# 安裝 .NET Core SDK
# 安裝 Node.js
# 安裝 pnpm
npm install -g pnpm
```

### 2. 創建 .NET Core 專案

```bash
dotnet new webapp
```

### 3. 創建 Vue 專案

```bash
cd WebApplication2
pnpm create vite vite-project --template vue
cd vite-project
pnpm install
```

### 4. 安裝必要的 Vue 依賴

```bash
cd vite-project
```

## Vite 配置

### vite.config.js

```javascript
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools()],
	build: {
		outDir: "../wwwroot", // 輸出到.NET Core的wwwroot目錄
		emptyOutDir: false, // 避免清空整個wwwroot目錄
		rollupOptions: {
			output: {
				entryFileNames: "assets/[name].[hash].js",
				chunkFileNames: "assets/[name].[hash].js",
				assetFileNames: (assetInfo) => {
					// 依據資源類型使用不同的目錄和名稱格式
					const fileName = assetInfo.fileName || assetInfo.name || "";

					// 檢查文件類型
					if (fileName.endsWith(".css") || assetInfo.type === "css") {
						return "assets/styles/[name].[hash].[ext]";
					}
					if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(fileName)) {
						return "assets/images/[name].[hash].[ext]";
					}
					if (/\.(woff2?|eot|ttf|otf)$/.test(fileName)) {
						return "assets/fonts/[name].[hash].[ext]";
					}
					return "assets/[name].[hash].[ext]";
				}
			}
		},
		manifest: true, // 生成 manifest.json
		sourcemap: false // 生產環境不需要 sourcemap
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	server: {
		proxy: {
			// 將 API 請求代理到 .NET Core 伺服器
			"/api": {
				target: "https://localhost:7223",
				changeOrigin: true,
				secure: false
			}
		}
	}
});
```

### 自訂資源文件輸出路徑說明

在上述配置中，`assetFileNames` 函數會根據不同類型的資源文件，生成不同的輸出路徑：

1. **CSS 文件**：會輸出到 `assets/styles/` 目錄
2. **圖片文件**：會輸出到 `assets/images/` 目錄
3. **字體文件**：會輸出到 `assets/fonts/` 目錄
4. **其他資源**：會輸出到 `assets/` 目錄

#### 版本相容性說明

請注意，在 Vite 3.0 及更高版本中，`assetInfo.name` 已被棄用（deprecated）。雖然目前仍可使用，但未來版本可能會完全移除此屬性。因此，推薦使用 `assetInfo.fileName` 或檢查 `assetInfo.type` 來確定資源類型，如上面代碼中所示：

```javascript
const fileName = assetInfo.fileName || assetInfo.name || "";
if (fileName.endsWith(".css") || assetInfo.type === "css") {
	// CSS 文件處理
}
```

這樣的組織結構讓靜態資源更加有條理，也便於管理和引用。

## .NET Core 配置

### 1. Index.cshtml

```cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

@if (Model.Environment.IsDevelopment())
{
    <!-- 開發環境：使用 Vite 開發服務器 -->
    <script type="module" src="http://localhost:5173/@@vite/client"></script>
    <script type="module" src="http://localhost:5173/src/main.js"></script>
    <!-- 在開發環境中，CSS 會通過 JS 自動注入，不需額外引入 -->
}
else
{
    <!-- 生產環境：使用打包後的檔案 -->
    <link rel="stylesheet" href="~/@Model.CssPath" />
    <script type="module" src="~/@Model.MainJsPath"></script>
}

<input type="hidden" id="csrf-token" name="__RequestVerificationToken" value="123123213213" />
<div id="app"></div>
```

### 2. Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text.Json;
using System.IO;
using System.Collections.Generic;

namespace WebApplication2.Pages
{
	public class IndexModel : PageModel
	{
		private readonly IWebHostEnvironment _environment;

		public IndexModel(IWebHostEnvironment environment)
		{
			_environment = environment;
		}
		public IWebHostEnvironment Environment => _environment;
		public string CsrfToken { get; private set; }
		public string MainJsPath { get; private set; }
		public string CssPath { get; private set; }

		public void OnGet()
		{
			// 如果不是開發環境，從manifest讀取資源路徑
			if (!Environment.IsDevelopment())
			{
				LoadAssetsFromManifest();
			}
		}

		private void LoadAssetsFromManifest()
		{
			try
			{
				string manifestPath = Path.Combine(Environment.WebRootPath, ".vite", "manifest.json");
				if (System.IO.File.Exists(manifestPath))
				{
					string manifestContent = System.IO.File.ReadAllText(manifestPath);
					using (JsonDocument doc = JsonDocument.Parse(manifestContent))
					{
						JsonElement root = doc.RootElement;
						var indexHtml = root.GetProperty("index.html");

						// 獲取 JS 路徑
						if (indexHtml.TryGetProperty("file", out JsonElement fileElement))
						{
							MainJsPath = fileElement.GetString();
						}
						else
						{
							MainJsPath = "assets/index.js"; // 預設值
						}

						// 獲取 CSS 路徑
						if (indexHtml.TryGetProperty("css", out JsonElement cssArray) && cssArray.GetArrayLength() > 0)
						{
							CssPath = cssArray[0].GetString();
						}
						else
						{
							CssPath = "assets/styles/index.css"; // 預設值
						}
					}
				}
				else
				{
					// 找不到 manifest.json 時使用預設值
					MainJsPath = "assets/index.js";
					CssPath = "assets/styles/index.css";
				}
			}
			catch (Exception ex)
			{
				// 發生錯誤時使用預設值
				MainJsPath = "assets/index.js";
				CssPath = "assets/styles/index.css";

				// 在開發環境可以記錄錯誤
				if (Environment.IsDevelopment())
				{
					Console.WriteLine($"讀取 manifest.json 錯誤: {ex.Message}");
				}
			}
		}
	}
}
```

### 3. 動態資源引用說明

上述程式碼實現了基於環境變數的動態資源引用：

1. **開發環境**：

    - 直接從 Vite 開發服務器載入 JS 檔案
    - CSS 通過 JS 自動注入，不需要單獨引用
    - 支援熱重載和實時更新

2. **生產環境**：

    - 從 manifest.json 讀取帶有哈希值的資源路徑
    - 動態生成 CSS 和 JS 的引用路徑
    - 即使檔案名稱每次構建後都變化，也能正確引用

3. **manifest.json 使用**：

    - Vite 打包時會生成 manifest.json
    - 包含所有資源的對應關係和路徑
    - 通過讀取此檔案，動態解析最新的資源路徑

4. **錯誤處理**：
    - 如果找不到 manifest.json 或讀取失敗，使用預設路徑
    - 確保系統在異常情況下仍能正常運行

這種動態引用機制的好處：

-   開發時有熱更新功能
-   生產環境使用哈希文件名稱，有利於瀏覽器快取
-   資源路徑動態生成，不需要手動更新
-   能夠適應不同的環境配置

### 4.設定環境變量

#### launchSettings.json 設置方式

1. **使用 Visual Studio 設置**：

    - 在方案總管中右鍵點擊專案
    - 選擇「屬性」
    - 切換到「除錯」(Debug) 頁面
    - 在「環境變數」區域進行設置

2. **手動編輯檔案**：
    - 路徑：`YourProject/Properties/launchSettings.json`
    - 基本結構：

```json
{
	"iisSettings": {
		"windowsAuthentication": false,
		"anonymousAuthentication": true,
		"iisExpress": {
			"applicationUrl": "http://localhost:6412",
			"sslPort": 44317
		}
	},
	"profiles": {
		"http": {
			"commandName": "Project",
			"dotnetRunMessages": true,
			"launchBrowser": true,
			"applicationUrl": "http://localhost:5094",
			"environmentVariables": {
				"ASPNETCORE_ENVIRONMENT": "Development"
			}
		},
		"https": {
			"commandName": "Project",
			"dotnetRunMessages": true,
			"launchBrowser": true,
			"applicationUrl": "https://localhost:7046;http://localhost:5094",
			"environmentVariables": {
				"ASPNETCORE_ENVIRONMENT": "Development"
			}
		},
		"IIS Express": {
			"commandName": "IISExpress",
			"launchBrowser": true,
			"environmentVariables": {
				"ASPNETCORE_ENVIRONMENT": "Development"
			}
		}
	}
}
```

3. **主要設置項目說明**：

    - `profiles`：定義不同的啟動配置
    - `commandName`：指定啟動方式（"Project" 或 "IISExpress"）
    - `applicationUrl`：應用程式的訪問地址
    - `environmentVariables`：環境變數設置
        - `ASPNETCORE_ENVIRONMENT`：環境名稱（Development、Staging、Production）
    - `launchBrowser`：是否自動啟動瀏覽器
    - `dotnetRunMessages`：是否顯示 .NET 執行訊息

4. **環境變數值說明**：

    - `Development`：開發環境，啟用開發者特定功能
    - `Staging`：測試環境
    - `Production`：生產環境

5. **注意事項**：
    - 開發時建議使用 `Development` 環境
    - 生產環境部署時應使用 `Production`
    - 環境設置會影響錯誤頁面、日誌記錄等行為
    - 請勿在版本控制中包含敏感的環境變數

## 開發流程

### 1. 啟動開發環境

```bash
# 終端機 1：啟動 .NET Core
dotnet run

# 終端機 2：啟動 Vite 開發伺服器
cd vite-project
pnpm dev
```

### 2. 開發 Vue 組件

```vue
<script setup>
import { ref, onMounted } from "vue";
let token = ref(null);
const tokenElement = document.getElementById("csrf-token");
if (tokenElement) {
	token.value = tokenElement.value;
	console.log("CSRF Token:", token.value);
}
</script>

<template>
	<div>
		TOKEN:
		<div v-if="token" class="token-info">
			<p>CSRF Token: {{ token }}</p>
			<div>LOVE</div>
		</div>
	</div>
</template>
```

## 常見問題

### 1. CSRF Token 問題

-   確保 token 元素在 Vue 掛載點之外
-   檢查 token 是否正確生成
-   確保 API 請求包含正確的 token header

### 2. 開發伺服器連接問題

-   確保兩個伺服器都在運行
-   檢查端口是否正確
-   確認代理設置是否正確

### 3. 熱重載問題

-   確保使用開發環境的腳本引用
-   檢查 Vite 開發伺服器是否正常運行

### 4. 生產環境問題

-   確保正確執行構建命令
-   檢查靜態檔案是否正確部署
-   確認環境變量設置正確

## 注意事項

1. 開發時需要同時運行兩個伺服器
2. 確保 token 正確設置和使用
3. 生產環境使用打包後的靜態檔案
4. 注意環境變量的設置
5. 定期更新依賴包

## 重要調整事項

### 1. 避免空參考異常

在使用 C# 9 或更高版本時，非空類型檢查非常嚴格，應該在構造函數中初始化所有非空屬性：

```csharp
public IndexModel(IWebHostEnvironment environment)
{
    _environment = environment;
    // 初始化屬性，避免 null 警告
    CsrfToken = string.Empty;
    MainJsPath = "assets/index.js"; // 預設值
    CssPath = "assets/styles/index.css"; // 預設值
}
```

### 2. 改進的 manifest.json 解析

為了更安全地讀取 manifest.json，建議使用 TryGetProperty 和 null 合併運算符：

```csharp
if (root.TryGetProperty("index.html", out JsonElement indexHtml))
{
    // 獲取 JS 路徑
    if (indexHtml.TryGetProperty("file", out JsonElement fileElement) &&
        fileElement.GetString() != null)
    {
        MainJsPath = fileElement.GetString() ?? "assets/index.js";
    }

    // 獲取 CSS 路徑
    if (indexHtml.TryGetProperty("css", out JsonElement cssArray) &&
        cssArray.GetArrayLength() > 0 &&
        cssArray[0].GetString() != null)
    {
        CssPath = cssArray[0].GetString() ?? "assets/styles/index.css";
    }
}
```

### 3. 測試生產環境的步驟

要測試應用程式在生產環境下的行為，請按照以下步驟操作：

1. **修改環境變數**：

    - 編輯 Properties/launchSettings.json
    - 將 ASPNETCORE_ENVIRONMENT 從 "Development" 改為 "Production"

2. **構建 Vite 專案**：

    ```powershell
    cd vite-project
    pnpm run build
    ```

3. **啟動 .NET Core 應用**：

    ```powershell
    cd ..
    dotnet run
    ```

4. **檢查是否正確使用生產資源**：

    - 打開瀏覽器訪問應用程式
    - 使用開發者工具檢查加載的資源
    - 確認使用的是打包後的 JS 和 CSS 文件

5. **暫時切換到生產環境（不修改配置文件）**：
    ```powershell
    $env:ASPNETCORE_ENVIRONMENT="Production"
    dotnet run
    ```

### 4. 處理進程衝突問題

如果遇到 "The process cannot access the file 'WebApplication2.exe' because it is being used by another process" 錯誤：

1. **找出並關閉佔用進程**：

    ```powershell
    taskkill /f /pid <進程ID>
    ```

2. **使用 --no-build 參數啟動**：

    ```powershell
    dotnet run --no-build
    ```

3. **如果問題持續，可以嘗試**：
    - 重啟 Visual Studio 或 IDE
    - 重啟電腦
    - 清理專案（`dotnet clean`）後再構建

### 5. 維護程序

定期維護專案的最佳實踐：

1. 更新依賴：

    ```powershell
    cd vite-project
    pnpm update
    ```

2. 構建測試：
    - 定期在生產模式下測試應用
    - 確保 manifest.json 解析正常
    - 檢查資源路徑是否正確加載

## 方案二：將 Vite 資源整合到 Layout 中

除了在每個頁面中單獨處理 Vite 資源外，還可以將資源引用整合到 \_Layout.cshtml 中，這樣能更好地集中管理所有頁面的資源引用。

### 1. 創建 ManifestViewComponent

```csharp
// Components/ManifestViewComponent.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using System.Text.Json;
using System.Collections.Generic;
using System.IO;

namespace WebApplication2.Components
{
    public class ManifestViewComponent : ViewComponent
    {
        private readonly IWebHostEnvironment _environment;
        private static Dictionary<string, string> _assetPaths = new Dictionary<string, string>();

        public ManifestViewComponent(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public IViewComponentResult Invoke()
        {
            if (!_environment.IsDevelopment())
            {
                LoadAssetsFromManifest();
            }

            return View(_assetPaths);
        }

        private void LoadAssetsFromManifest()
        {
            try
            {
                // 如果已經載入過，就不重複載入
                if (_assetPaths.Count > 0)
                {
                    return;
                }

                string manifestPath = Path.Combine(_environment.WebRootPath, ".vite", "manifest.json");
                if (System.IO.File.Exists(manifestPath))
                {
                    string manifestContent = System.IO.File.ReadAllText(manifestPath);
                    using (JsonDocument doc = JsonDocument.Parse(manifestContent))
                    {
                        JsonElement root = doc.RootElement;
                        if (root.TryGetProperty("index.html", out JsonElement indexHtml))
                        {
                            // 獲取 JS 路徑
                            if (indexHtml.TryGetProperty("file", out JsonElement fileElement) &&
                                fileElement.GetString() != null)
                            {
                                _assetPaths["MainJsPath"] = fileElement.GetString() ?? "assets/index.js";
                            }
                            else
                            {
                                _assetPaths["MainJsPath"] = "assets/index.js";
                            }

                            // 獲取 CSS 路徑
                            if (indexHtml.TryGetProperty("css", out JsonElement cssArray) &&
                                cssArray.GetArrayLength() > 0 &&
                                cssArray[0].GetString() != null)
                            {
                                _assetPaths["CssPath"] = cssArray[0].GetString() ?? "assets/styles/index.css";
                            }
                            else
                            {
                                _assetPaths["CssPath"] = "assets/styles/index.css";
                            }
                        }
                    }
                }
                else
                {
                    // 找不到 manifest.json 時使用預設值
                    _assetPaths["MainJsPath"] = "assets/index.js";
                    _assetPaths["CssPath"] = "assets/styles/index.css";
                }
            }
            catch
            {
                // 發生錯誤時使用預設值
                _assetPaths["MainJsPath"] = "assets/index.js";
                _assetPaths["CssPath"] = "assets/styles/index.css";
            }
        }
    }
}
```

### 2. 創建 ViewComponent 視圖

在 `Pages/Shared/Components/Manifest` 目錄下創建 `Default.cshtml` 文件：

```cshtml
@model Dictionary<string, string>

@if (Model.ContainsKey("CssPath") && !string.IsNullOrEmpty(Model["CssPath"]))
{
    <link rel="stylesheet" href="~/@Model["CssPath"]" />
}

@if (Model.ContainsKey("MainJsPath") && !string.IsNullOrEmpty(Model["MainJsPath"]))
{
    <script type="module" src="~/@Model["MainJsPath"]"></script>
}
```

### 3. 修改 \_Layout.cshtml

```cshtml
@using Microsoft.AspNetCore.Hosting
@using Microsoft.Extensions.Hosting
@using Microsoft.Extensions.DependencyInjection
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - WebApplication2</title>

    @if (ViewContext.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>().IsDevelopment())
    {
        <!-- 開發環境：使用 Vite 開發服務器 -->
        <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
        <link rel="stylesheet" href="~/WebApplication2.styles.css" asp-append-version="true" />

        <!-- Vite 開發服務器 -->
        <script type="module" src="http://localhost:5173/@@vite/client"></script>
        <script type="module" src="http://localhost:5173/src/main.js"></script>
    }
    else
    {
        <!-- 生產環境：使用靜態文件 -->
        <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" href="~/css/site.min.css" asp-append-version="true" />
        <link rel="stylesheet" href="~/WebApplication2.styles.css" asp-append-version="true" />

        <!-- 從 manifest.json 讀取的 Vite 資源 -->
        @await Component.InvokeAsync("Manifest")
    }
</head>
<body>
    <header>
        <!-- ... existing header code ... -->
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <!-- ... existing footer code ... -->
    </footer>

    @if (ViewContext.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>().IsDevelopment())
    {
        <!-- 開發環境 JS 文件 -->
        <script src="~/lib/jquery/dist/jquery.min.js"></script>
        <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="~/js/site.js" asp-append-version="true"></script>
    }
    else
    {
        <!-- 生產環境 JS 文件 -->
        <script src="~/lib/jquery/dist/jquery.min.js"></script>
        <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="~/js/site.min.js" asp-append-version="true"></script>
    }

    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>
```

### 4. 簡化 Index.cshtml

```cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}

<input type="hidden" id="csrf-token" name="__RequestVerificationToken" value="123" />
<div id="app"></div>
```

### 5. ViewComponent 路徑說明

ASP.NET Core 有嚴格的 ViewComponent 命名和位置約定：

1. **ViewComponent 類位置**：

    - 通常放在 `Components` 目錄
    - 名稱必須以 `ViewComponent` 結尾（如 `ManifestViewComponent`）

2. **ViewComponent 視圖位置**：

    - 必須放在以下位置之一：
        - /Pages/Shared/Components/{ComponentName}/Default.cshtml
        - /Views/Shared/Components/{ComponentName}/Default.cshtml
    - 其中 {ComponentName} 是 ViewComponent 類名稱去掉 "ViewComponent" 後綴

3. **目錄結構示例**：

```
WebApplication2/
├── Components/
│   └── ManifestViewComponent.cs
├── Pages/
│   ├── Shared/
│   │   ├── Components/
│   │   │   └── Manifest/
│   │   │       └── Default.cshtml
│   │   └── _Layout.cshtml
```

### 6. 優點

1. **集中管理資源**：

    - 所有頁面共享同一個 Layout
    - 避免在每個頁面中重複處理環境判斷和資源引用

2. **性能優化**：

    - manifest.json 只需讀取一次（靜態字典）
    - 適合大型應用與多頁面

3. **更好的關注點分離**：

    - 資源引用邏輯封裝在 ViewComponent 中
    - 各頁面只關注內容，不需關心資源引用

4. **維護性提升**：
    - 修改資源引用只需修改一處代碼
    - 新增頁面不需重複處理資源引用

### 7. 注意事項

1. **注意視圖位置**：

    - ViewComponent 視圖必須放在正確的目錄下
    - 錯誤的位置會導致「視圖未找到」錯誤

2. **進程衝突處理**：

    - 如遇到進程衝突問題，使用 `taskkill` 命令關閉佔用進程
    - 使用 `dotnet clean` 清理項目後再構建

3. **測試生產環境**：
    - 使用命令或修改 launchSettings.json 切換環境
    - 確保 ViewComponent 能正確讀取 manifest.json
