# day1_setup.py
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# ⚙️ 建立 Chrome WebDriver，支援 headless 與有頭模式
def create_driver(headless=False):
    options = Options()
    if headless:
        # 使用 Selenium 4.10+ 推薦的 headless 模式選項
        options.add_argument("--headless=new")
        options.add_argument("--disable-gpu")            # 關閉 GPU 減少渲染異常
        options.add_argument("--window-size=1920,1080")  # 設定視窗大小以確保內容正確渲染
    # 自動下載相容 ChromeDriver（無需手動安裝）
    service = Service(ChromeDriverManager().install())
    # 回傳 WebDriver 實例
    return webdriver.Chrome(service=service, options=options)

def main():
    # ➕ 你可以切換 headless=True 測試無頭模式
    driver = create_driver(headless=True)

    # 🔗 打開 momo 購物網首頁
    driver.get("https://www.momoshop.com.tw")
    # ✅ 印出頁面標題以確認是否正確加載
    print("頁面標題：", driver.title)

    # 🔚 清理並關閉 WebDriver
    driver.quit()

if __name__ == "__main__":
    main()
