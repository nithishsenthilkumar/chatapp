import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import HtmlTestRunner

class LoginTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Setup Chrome WebDriver
        chrome_driver_path = "drivers/chromedriver.exe"
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("webdriver.chrome.driver=" + chrome_driver_path)
        cls.driver = webdriver.Chrome(options=chrome_options)
        cls.driver.implicitly_wait(10)  # Implicit wait for 10 seconds

    def test_login_and_navigation(self):
        # Login
        self.driver.get("http://localhost:5173/login")
        email_field = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.NAME, "email"))
        )
        password_field = self.driver.find_element(By.NAME, "password")
        login_button = self.driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]")
        email_field.send_keys("n.com")
        password_field.send_keys("nnnnnnnn")
        login_button.click()
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("home")
        )
        
        # Click on the button
        try:
            button_element = WebDriverWait(self.driver, 10).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, "button.focus\:outline-none"))
            )
            button_element.click()
            print("Clicked on the button successfully.")
            
            # Wait for URL to contain "home"
            WebDriverWait(self.driver, 10).until(
                EC.url_contains("home")
            )
            print("Navigated to the home page successfully after clicking the button.")
        except Exception as e:
            print("Failed to click on the button or navigate to the home page:", e)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

if __name__ == "__main__":
    unittest.main(testRunner=HtmlTestRunner.HTMLTestRunner(output="reports"))
