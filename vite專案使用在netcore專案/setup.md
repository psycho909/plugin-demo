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
				assetFileNames: "assets/[name].[hash].[ext]"
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

## .NET Core 配置

### 1. Index.cshtml

```cshtml
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
<input type="hidden" id="csrf-token" name="__RequestVerificationToken" value="123213213123123" />
<div id="app"></div>
@if (Model.Environment.IsDevelopment())
{
    <script type="module" src="http://localhost:5174/@@vite/client"></script>
    <script type="module" src="http://localhost:5174/src/main.js"></script>
}
else
{
    <script type="module" src="~/assets/main.js"></script>
}
```

### 2. Index.cshtml.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

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

		public void OnGet()
		{
		}

	}
}
```

### 3.設定環境變量

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
