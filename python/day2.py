from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import schedule, time, sys

# === 使用者設定區 ===
ENABLE_MEMBER = True
COOKIES = {
    "LOGINSESSION": "MTcyOGFiMTItYjQ5Mi00MjdlLWE4NTMtZjEyZDQ1ODNkNjFh",
    "bid":          "520309b463597e4c1868376644c09c81",
    "st":           "c9654a77d22fd8b416b06873abc66c5b"
}
BUY_URL = "https://www.momoshop.com.tw/TP/TP0001455/goodsDetail/TP00014550000739"
POLL_INTERVAL = 10
KEYWORD = "switch2"
RESULT_COUNT = 5
INTERVAL_SEC = 60
# =======================

def setup_driver():
    opts = webdriver.ChromeOptions()
    # opts.add_argument("--headless")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    return webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=opts)

def cookie_login(driver):
    # 先造訪主網域的任意頁（如不存在頁）來設定網域上下文
    driver.get("https://www.momoshop.com.tw/nonexistent404page")
    time.sleep(1)

    driver.delete_all_cookies()
    for name, val in COOKIES.items():
        driver.add_cookie({
            "name": name,
            "value": val,
            # 使用 .momoshop.com.tw 可跨子網域使用 :contentReference[oaicite:5]{index=5}
            "domain": ".momoshop.com.tw",
            "path": "/",
            "httpOnly": True
        })

    # 導向購買頁面，確認登入狀態
    driver.get(BUY_URL)
    time.sleep(3)
    if "立即購買" in driver.page_source:
        print("✅ Cookie 驗證成功，登入且可購買")
        return True
    print("❌ Cookie 登入失敗或無法保持狀態")
    return False

def attempt_direct_buy(driver):
    while True:
        buttons = driver.find_elements(By.CSS_SELECTOR, ".goods-detail-checkout button")
        for btn in buttons:
            if btn.text.strip() == "購買":
                print("🛒 找到購買，點擊中…")
                btn.click()
                print("✅ 已完成點擊，任務成功，瀏覽器繼續開啟")
                return
        print(f"⚠ 未找到購買，{POLL_INTERVAL} 秒後刷新")
        time.sleep(POLL_INTERVAL)
        driver.refresh()
        time.sleep(2)

def scrape_products(driver):
    url = f"https://www.momoshop.com.tw/search.momo?searchKeyword={KEYWORD}"
    driver.get(url)
    time.sleep(3)
    items = driver.find_elements(By.CSS_SELECTOR, ".goodsUrl")[:RESULT_COUNT]
    print(f"[搜尋] {len(items)} 筆商品：")
    for ele in items:
        try:
            name = ele.find_element(By.CSS_SELECTOR, ".prdName").text
            price = ele.find_element(By.CSS_SELECTOR, ".price b").text
            print(f"- {name}｜{price}")
        except:
            continue
    print("-" * 40)

if __name__ == "__main__":
    driver = setup_driver()

    if ENABLE_MEMBER:
        if cookie_login(driver):
            attempt_direct_buy(driver)
            print("🔎 任務完成。請確認後續流程，或 Ctrl+C 關閉瀏覽器")
            try:
                while True:
                    time.sleep(1)
            except KeyboardInterrupt:
                print("✅ 使用者中斷，瀏覽器即將關閉")
        else:
            print("❌ 登入失敗，結束程式")
        driver.quit()
        sys.exit(0)

    # 非會員：持續搜尋
    scrape_products(driver)
    schedule.every(INTERVAL_SEC).seconds.do(scrape_products, driver)
    print(f"🕒 非會員模式，搜尋每 {INTERVAL_SEC} 秒")
    try:
        while True:
            schedule.run_pending()
            time.sleep(1)
    except KeyboardInterrupt:
        driver.quit()
        print("✅ 程式結束，瀏覽器已關閉。")
