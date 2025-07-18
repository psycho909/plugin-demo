from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# === 你的帳號密碼設定 ===
USERNAME = ""
PASSWORD = ""

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://m.momoshop.com.tw/mymomo/login.momo")

wait = WebDriverWait(driver, 15)

# 1️⃣ 等待 iframe 出現並切換進去
iframe = wait.until(EC.presence_of_element_located((By.TAG_NAME, "iframe")))
driver.switch_to.frame(iframe)
print("✅ 已切換到 iframe")

# 2️⃣ 定位帳號／密碼欄位
user_in = wait.until(EC.presence_of_element_located(
    (By.CSS_SELECTOR, "#login input[type='text']")
))
pass_in = wait.until(EC.presence_of_element_located(
    (By.CSS_SELECTOR, "#login input[type='password']")
))
print("✅ 找到欄位：")
print(" - 帳號欄：", user_in.get_attribute("outerHTML"))
print(" - 密碼欄：", pass_in.get_attribute("outerHTML"))

# 3️⃣ 偵錯：存檔 iframe HTML（方便你檢查完整結構）
html_iframe = driver.page_source
with open("debug_iframe_login.html", "w", encoding="utf-8") as f:
    f.write(html_iframe)
print("✅ 已儲存 iframe 內容到 debug_iframe_login.html")

# 4️⃣ 輸入帳密並點擊登入按鈕
user_in.clear(); user_in.send_keys(USERNAME)
pass_in.clear(); pass_in.send_keys(PASSWORD)

login_btn = wait.until(EC.element_to_be_clickable(
    (By.CSS_SELECTOR, "#login .loginBtn .login")
))
print("✅ 發現登入按鈕，準備點擊")
login_btn.click()

# 5️⃣ 等待登入跳轉（確認登入）
time.sleep(5)  # 或你可監聽更穩定的登入後 element

# 回到主框架繼續後續動作
driver.switch_to.default_content()
print("✅ 完成登入動作，已切回主頁 context")

# 暫停觀察畫面
time.sleep(5)
driver.quit()
print("✅ 測試完成，瀏覽器已關閉。")
