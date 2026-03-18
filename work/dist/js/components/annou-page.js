import useEventStore from "../store.js";
const { ref, computed, watch, onMounted, onUnmounted } = Vue;
let annouPage={
    setup(){
        const store = useEventStore();
		return {
        }
    },
    template:`
    <div class="annou-page-section">
				<div class="annou-page-container">
					<div class="annou-page-head">
						<span class="annou-page-head__tag" data-type="event">活動</span>
						<span class="annou-page-head__title">活動公告標題標籤依照分類變化顏色</span>
					</div>
					<div class="annou-page-content">
						<p style="margin-left: 15px">&nbsp;</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">親愛的玩家，您好：</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #222222">&nbsp;</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">2026/02/12(四)維護後</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #fabf8f">【已知問題】</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">處理說明如下，</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">處理期間將不定時更新處理進度與修正說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">&nbsp;</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">※下列問題均已反映處理中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●進入【燃燒的炎魔要塞(一般)】地圖之剩餘時間異常問題已在確認中；後續補償方案，請靜待官網公告。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #666666">(2026/02/23新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●於【名譽的戰場】地圖內使用【勇敢藥水】並無出現對應BUFF、導致開啟PSS功能時會不斷消耗【勇敢藥水】之問題。煩請進入【名譽的戰場】及其加時地圖時，先將PSS功能之【勇敢藥水】卸下，以避免不必要之消耗；而因此問題受影響之玩家補償方案，請靜待官網公告。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #666666">(2026/02/14新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●轉生之島-道具【3階段魔法娃娃箱子】回收時間問題。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #666666">(2026/02/06新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●於名譽的戰場使用PSS系統，精靈餅乾會持續使用問題。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #666666">(2025/05/19新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●【沙哈的執念】PVE技能於部份地圖無傷害效果</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #666666">(2023/08/03新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●機率型道具查看功能，部分飾品道具顯示有誤。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(9/16新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※機率系統說明文字有誤已反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●強化龍之T恤時，有機率發生動畫卡圖的情形。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(9/16新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●血盟集結地副本門扉即將關閉時的提示訊息，以及角色身上持有盟誓的證明時，點擊血盟的門扉時的訊息顯示為亂碼。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(12/24新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">● 部分血盟盟徽無法正常顯示問題。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(09/18新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※僅顯示異常不會影響遊戲進行，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">● 右上方地圖區塊遊戲時間異常。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(03/26新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※僅顯示異常不會影響遊戲進行，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●【夢幻之島】副本的自動配對系統異常，無法正常建立副本房間。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(02/13新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●【世界職業地監】非公告說明開放時段，仍有機率出現世界職業地監入口。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(02/09新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●【排行榜BUFF負重解除】在負重達到82%以上時，無法使用技能。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(01/22新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※待處理完成將更新本公告說明。※若發生此情形，請將負重低於82%即可使用技能。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">● 副本介面的文字顯示不完整。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(01/22新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※不影響遊戲進行，顯示問題後續會修正。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●【鱷魚島的秘密】副本，部分系統文字顯示亂碼。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(01/09新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※不影響遊戲進行，顯示問題後續會修正。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●新創角色，新手任務機率性發生未領取到綠色藥水的情況，導致無法與NPC對話及完成新手任務。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(12/20新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※若發生此情形，請將角色刪除後重新創立即可排除。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●刪除角色31等(含)以上的角色後，登入同遊戲帳號其他角色，會重置刪除倒數時間</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #767171">。</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">(11/14新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※反映原廠確認中，待處理完成將更新本公告說明。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">&nbsp;</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #7f7f7f">-----------------------(其他說明/提醒)------------------------</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※飾品道具無法使用[對盔甲施法的卷軸]，此為正常的遊戲設定。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●HOT TIME PUSH活動獎勵延遲發送問題</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※HOT TIME PUSH獎勵有延遲發送情形，若於活動時間未收到獎勵信件，請稍晚再確認即可。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">● 執行遊戲出現【GameGurd execute error：360】</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※更新不完全，請嘗試關閉所有程式，將電腦關機再重新登入即可排除問題。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">● 遊戲中開啟奇岩商城，若點擊與MENU列表重疊的地方，會發生奇岩商城關閉的狀況。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※開啟奇岩商城後，請點擊遊戲下方功能列的MENU縮回，即可使用商城。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">● 遊戲介面的任務項目紅點顯示異常。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92d050">※請以實際任務頁面進行說明為主。</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">&nbsp;</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #00b0f0">【已修正/調整】</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">---------------(2026/02/12) 調整/修正)------------</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●【星星閃耀的夜晚】活動部分玩家製作次數已重置。(2026/02/06新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">---------------(2026/02/05) 調整/修正)------------</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●2026/01/22更新之卡瑪寶箱製作項目中，食人巨魔的斧頭及食人巨魔的斧頭(刻印)已納入最上級武器選擇箱的材料清單中(2026/01/22新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">---------------(2026/01/29) 調整/修正)------------</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●2026/01/22更新之卡瑪寶箱製作項目中，+5龍盔甲選擇箱開啟後之道具已修正為一般屬性，可正常製作(2026/01/22新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●持有鬥魂的修練徽章，於說話之島地監1~2樓、黑色戰艦1~3樓已可正常套用BUFF(2026/01/22新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">---------------(2026/01/23) 調整/修正)------------</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">●轉生之島伺服器專屬之商品「藍鑽方塊」開啟後獲得之藍鑽及剩餘使用次數錯誤之問題已排除，目前商品以重新上架，先前已購買之異常玩家已補回完畢(2026/01/23新增)</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">&nbsp;</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">-●其他【已修正/調整】說明。</span></span></span
							><a href="https://tw-event.beanfun.com/Lineagenew/EventAD/EventAD.aspx?EventADID=6031" style="text-decoration: none"
								><span style="font-size: 10pt"
									><span style="font-family: &quot;Microsoft JhengHei&quot;"
										><span style="color: #ffff00"><u>(請點此連結進入)</u></span></span
									></span
								></a
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #ff99ff">現在~立刻~加入追蹤</span></span></span
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92cddc">《</span></span></span
							><a href="https://www.facebook.com/Gamania.LineageTW" style="text-decoration: none"
								><span style="font-size: 10pt"
									><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92cddc">facebook-【天堂】粉絲團</span></span></span
								></a
							><span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #92cddc">》</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">感謝玩家對於天堂國際服的支持與愛護，祝您遊戲愉快~</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #e36c0a">Have a Good game！</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">&nbsp;</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">
							<span style="font-size: 10pt"
								><span style="font-family: &quot;Microsoft JhengHei&quot;"><span style="color: #948a54">《天堂國際服》 營運團隊 敬上</span></span></span
							>
						</p>
	
						<p style="margin-left: 15px">&nbsp;</p>
	
						<p style="margin-left: 15px">&nbsp;</p>
	
						<p style="margin-left: 15px">&nbsp;</p>
	
						<p style="margin-left: 15px">&nbsp;</p>
					</div>
				</div>
				<a href="/News" class="annou-page-back">返回</a>
			</div>
    `
}

export default annouPage;