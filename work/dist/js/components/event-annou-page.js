import useEventStore from "../store.js";
const { ref, computed, watch, onMounted, onUnmounted } = Vue;
let eventAnnouPage={
    setup(){
        const store = useEventStore();
        return {
        }
    },
    template:`
    <div class="event-annou-page-section">
            <div class="event-annou-page-container">
                <div class="event-annou-page-menu-wrap close">
                    <div class="event-annou-page-menu__btn"></div>
                    <div class="event-annou-page-menu">
                        <div class="event-annou-page-menu__list">
                            <a href="javascript:;" class="event-annou-page-menu__item" target="_blank">懷舊服上線</a>
                            <a href="javascript:;" class="event-annou-page-menu__item" target="_blank">2025跨年</a>
                        </div>
                    </div>
                </div>
                <div class="event-annou-page-title" data-type="h1">活動標題是置中</div>
                <div class="event-annou-page-inner">
                    <div class="event-annou-page-content">
                        <div class="event-annou-page-title" data-type="h2">活動時間</div>
                        <div class="event-annou-page-text">
                            <div class="event-annou-page-time">
                                <span>2026/01/11 11:59~</span>
                                <span>2026/02/22 23:59</span>
                            </div>
                        </div>
                    </div>
                    <div class="event-annou-page-content">
                        <div class="event-annou-page-title" data-type="h2">活動參與方式</div>
                        <div class="event-annou-page-text">
                            <h2>
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830678530.jpeg" /></span>
                            </h2>

                            <p>
                                <br />
                                &nbsp;
                            </p>

                            <hr />
                            <h2>
                                <br />
                                &nbsp;
                            </h2>

                            <h3>
                                <span
                                    ><span><strong>【活動時間】</strong></span></span
                                >
                            </h3>

                            <p>
                                <span><span>2026 年 2 月 12 日（週四）維護後 ～ 2026 年 3 月 12 日（週四）維護前</span></span
                                ><br />
                                <br />
                                &nbsp;
                            </p>

                            <h3>
                                <span
                                    ><span><strong>【遊玩條件】</strong></span></span
                                >
                            </h3>

                            <ul>
                                <li style="list-style-type: disc">
                                    <span><span>重生過的角色</span></span>
                                </li>
                                <li style="list-style-type: disc">
                                    <span><span>收到嚮導任務，向卡普港口附近的NPC林斐對話，並登記為活動代表角色</span></span>
                                </li>
                            </ul>

                            <p>&nbsp;</p>

                            <h3>
                                <span
                                    ><span><strong>【嚮導任務】</strong></span></span
                                >
                            </h3>

                            <h3>
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830678592.png" /><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830678625.png" /><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830678550.png"
                                /></span>
                            </h3>

                            <p>
                                <br />
                                &nbsp;
                            </p>

                            <h3>
                                <span
                                    ><span><strong>【遊玩方式】</strong></span></span
                                >
                            </h3>

                            <ul>
                                <li style="list-style-type: disc">
                                    <span><span>完成每日任務</span></span>
                                </li>
                                <li style="list-style-type: disc">
                                    <span><span>達成主要任務目標</span></span>
                                </li>
                                <li style="list-style-type: disc">
                                    <span><span>獲得活動代幣，消耗活動代幣打開福袋獲得獎勵</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <br />
                                <span
                                    ><span><strong>【活動介面】</strong></span></span
                                ><br />
                                <br />
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830678455.png" /><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830678662.png" /><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830685522.png"
                                /></span>
                            </p>

                            <h3>&nbsp;</h3>

                            <hr />
                            <p>
                                <br />
                                <br />
                                <br />
                                <span
                                    ><span><strong>【主要任務】</strong></span></span
                                ><br />
                                <br />
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830685297.png" /></span>
                            </p>

                            <p>
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830685493.png" /></span>
                            </p>

                            <p>
                                <span
                                    ><strong><span>【租借李現的服裝】</span></strong
                                    ><br />
                                    <br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830685470.png"
                                /></span>
                            </p>

                            <ul>
                                <li>
                                    <span><span>租借的服裝能夠進行自由染色</span></span>
                                </li>
                                <li>
                                    <span><span>無法收錄於造型沙龍中套用其他動作</span></span>
                                </li>
                                <li>
                                    <span><span>無法進行威光</span></span>
                                </li>
                                <li>
                                    <span><span>無法進行丟棄，若不需要該服裝可直接右鍵進行銷毀</span></span>
                                </li>
                            </ul>

                            <p>
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830685372.png" /></span><br />
                                &nbsp;
                            </p>

                            <ul>
                                <li>
                                    <span><span>需要批量刪除可向NPC李現對話</span></span>
                                </li>
                            </ul>

                            <p>
                                <span><span>※此銷毀會將身上所有的租借活動服裝刪除(包含穿著在身上的)</span></span>
                            </p>

                            <p>
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830685437.png" /></span>
                            </p>

                            <p>&nbsp;</p>

                            <ul>
                                <li>
                                    <span><span>活動結束後，所有活動租借服裝也會進行刪除</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <br />
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830690922.png" /><br />
                                    <strong><span>【與林斐的兔寶散步回來】</span></strong></span
                                ><br />
                                &nbsp;
                            </p>

                            <ul>
                                <li>
                                    <span><span>使用迷你寵物後，道具屬性顯示「召喚中」並維持10分鐘</span></span>
                                </li>
                            </ul>

                            <p>
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830690987.png" /><br />
                                    <br />
                                    <br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830691028.png" /><br />
                                    <br />
                                    <strong><span>【接受李現的委託】</span></strong></span
                                >
                            </p>

                            <ul>
                                <li>
                                    <span><span>依照任務需求，與NPC對話</span></span
                                    ><br />
                                    <br />
                                    &nbsp;
                                </li>
                            </ul>

                            <p>
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830691124.png" /><br />
                                    <strong><span>【接受林斐的委託】</span></strong></span
                                >
                            </p>

                            <ul>
                                <li>
                                    <span><span>依照任務需求，與NPC對話</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <br />
                                <br />
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830691157.png" /><br />
                                    <strong><span>【與李現製作蒸包子】</span></strong></span
                                >
                            </p>

                            <ul>
                                <li>
                                    <span><span>依照任務需求製作指定料理</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830691175.png" /><br />
                                    <br />
                                    <br />
                                    <br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830696989.png"
                                /></span>
                            </p>

                            <p>
                                <span
                                    ><strong><span>【協助林斐燃放煙火】</span></strong></span
                                >
                            </p>

                            <ul>
                                <li>
                                    <span><span>依照任務需求使用道具</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830696872.png" /><br />
                                    <span>※道具名稱將統一修正為”燈會紀念煙火工具”</span><br />
                                    <br />
                                    <br />
                                    <br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830697044.png"
                                /></span>
                            </p>

                            <p>
                                <span
                                    ><strong><span>【為林斐捕捉金魚】</span></strong></span
                                >
                            </p>

                            <ul>
                                <li>
                                    <span><span>依照任務需求，與NPC對話</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <br />
                                <br />
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830697021.png" /><br />
                                    <strong><span>【一起來分紅包】</span></strong></span
                                >
                            </p>

                            <ul>
                                <li>
                                    <span><span>依照任務需求，與NPC對話</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <br />
                                &nbsp;
                            </p>

                            <hr />
                            <p>
                                <br />
                                <br />
                                <br />
                                <span
                                    ><span><strong>【每日任務】</strong></span></span
                                ><br />
                                &nbsp;
                            </p>

                            <ul>
                                <li>
                                    <span><span>共五種類型</span></span>
                                </li>
                                <li>
                                    <span><span>現實時間早上7點重置</span></span>
                                </li>
                                <li>
                                    <span><span>兔寶散步需要先進行主要任務後，隔天可獲得</span></span>
                                </li>
                                <li>
                                    <span><span>若當日未完成，隔天會自動發放新的任務(進度會重置)</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                <br />
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830696966.png" /><br />
                                    <br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830697065.png" /><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830702432.png"
                                /></span>
                            </p>

                            <p>
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830702466.png" /></span>
                            </p>

                            <h2>
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830702589.png" /></span>
                            </h2>

                            <p>
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830702684.png" /></span>
                            </p>

                            <p>
                                <span
                                    >※韭菜獲得方式更正為需擁有尋找料理技能，透過打怪方式取得<br />
                                    <br />
                                    ※此任務因相關異常已取消，詳請請查看<a href="https://mabinogi.beanfun.com/News?catId=inside&amp;bid=78766">公告</a></span
                                ><br />
                                &nbsp;
                            </p>

                            <hr />
                            <p>&nbsp;</p>

                            <p>
                                <span
                                    ><span><strong>【活動獎勵】</strong></span></span
                                ><br />
                                <br />
                                <br />
                                <span
                                    ><strong><span>福袋兔寶寵物哨子</span></strong
                                    ><br />
                                    <br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830702735.png"
                                /></span>
                            </p>

                            <ul>
                                <li>
                                    <span
                                        ><span>物品欄大小/技能效果與</span
                                        ><a href="https://mabinogi-gama-event.beanfun.com/index?Url=FB9D063C3DCD22F7CD58844A69758DD7.3261" style="text-decoration: none"
                                            ><span><u>一般兔寶</u></span></a
                                        ><span>相同</span></span
                                    >
                                </li>
                                <li>
                                    <span><span>不可染色</span></span>
                                </li>
                                <li>
                                    <span><span>無法使用寵物角色轉讓勳章</span></span>
                                </li>
                            </ul>

                            <p>
                                <br />
                                &nbsp;
                            </p>

                            <p>&nbsp;</p>

                            <p>
                                <br />
                                <br />
                                <strong
                                    ><span><span>兔寶迷你寵物選擇箱子</span></span></strong
                                >
                            </p>

                            <p>
                                <span
                                    ><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830702717.png" /><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830708003.png" /><br />
                                    <br />
                                    <br />
                                    <br />
                                    <strong><span>李現的高級服裝背包箱子</span></strong
                                    ><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830707901.png" /><br />
                                    <span>背包大小：10×15／長2格寬2格／無法染色</span><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830707940.png" /></span
                                ><br />
                                &nbsp;
                            </p>

                            <p>
                                <span
                                    ><strong><span>焰映華燈之會背包兌換券</span></strong
                                    ><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830708133.png" /><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830708179.png" /><br />
                                    <span>背包大小：8×7／長1格寬1格／無法染色</span><br />
                                    <br />
                                    <br />
                                    <strong><span>焰映華燈之會背包用皇家小包包</span></strong
                                    ><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830708163.png" /><br />
                                    <span>可用來擴充焰映華燈之會背包4次</span><br />
                                    <br />
                                    <br />
                                    <strong><span>焰映華燈之會連續技卡選擇箱子</span></strong
                                    ><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830709010.png" /><br />
                                    <span>選擇技能後,可獲得1個6欄位全滿的連續技卡片的箱子.連續技卡片最多具有62%效果,6個欄位皆以單一技能組成.只有焰映華燈之會活動代表角色可以使用</span><br />
                                    <br />
                                    <br />
                                    <strong><span>林斐的燈會箱子</span></strong
                                    ><br />
                                    <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830713281.png"
                                /></span>
                            </p>

                            <div>
                                <table cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span
                                                        ><span><strong>箱子物品列表(機率性獲得)</strong></span></span
                                                    >
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>心機小貓的珠子</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>魔力賦予能力上升卷軸</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>浪漫農場春天花園水井</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>浪漫農場春天花園噴泉</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>浪漫農場春天花園藤樹</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>浪漫農場春天花園櫻花長椅</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>技能修練徽章(50)(活動)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>生活技能修練值 2倍藥水 (1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>魔法技能修練值 2倍藥水 (1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>戰鬥技能修練值 2倍藥水 (1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>音樂修練值 2倍藥水 (1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>鍊金術技能修練值 2倍藥水(1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>武鬥技能修練值 2倍藥水 (1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>雙槍修練值 2倍藥水 (1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>人偶術修練值 2倍藥水 (1日)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>忍者技能修練值2倍藥水(1天)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放1號格子的初級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放2號格子的初級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放3號格子的初級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放1號格子的中級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放2號格子的中級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放3號格子的中級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放1號格子的高級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放2號格子的高級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>開放3號格子的高級替代材料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>心心煙火工具</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>可愛娜歐煙火工具</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>可愛佛格斯煙火工具</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>可愛帕迪亞露露煙火工具</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>可愛珮西與提亞煙火工具</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>天燈氣球</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>天燈</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>仙女棒</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>六角燈籠</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>古典東方扇子</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>古典東方雨傘</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>古典東方毛筆</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>古典東方巨大毛筆</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>古典東方雨傘外型卷軸</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>古典東方毛筆外型卷軸</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>古典東方巨大毛筆外型卷軸</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質皮革袋</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>高級皮革腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>普通皮革腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>廉價皮革腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質絲綢腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>高級絲綢腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>普通絲綢腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>廉價布料腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質布料腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>高級布料腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>普通布料腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>廉價布料腰包</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質木柴</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質皮繩</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質絲綢</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質布料</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>優質皮革</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>9歲體型變化藥水(無法交易)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>10歲體型變化藥水(無法交易)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>11歲體型變化藥水(無法交易)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>12歲體型變化藥水 藥水(無法交易)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>13歲體型變化藥水(無法交易)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>14歲體型變化 藥水(無法交易</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>15歲體型變化藥水(無法交易</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>16歲體型變化藥水(無法交易</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>17歲體型變化 藥水(無法交易)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>18歲體型變化藥水(無法交易)</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>寵物體型變成 1歲的藥水</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>寵物體型變成 2歲的藥水</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>寵物體型變成 3歲的藥水</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>寵物體型變成 4歲的藥水</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>
                                                    <span><span>寵物體型變成 5歲的藥水</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2>
                                <br />
                                <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770831249190.png" /><br />
                                <strong
                                    ><span><span>浪漫農場春天花園櫻花長椅</span></span></strong
                                ><br />
                                <span><span>能夠設置於浪漫農場的春天庭園櫻花長椅. 於浪漫農場設置該櫻花長椅的期間能力值上升.&nbsp;</span></span>
                            </h2>

                            <p>
                                <span><span>[*智力: +7, 意志: +5](可以油漆, 不可重複套用, 解除設置時能力值上升效果消失.)</span></span>
                            </p>

                            <p>&nbsp;</p>

                            <p>
                                <br />
                                <br />
                                <span><img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770830713363.png" /></span>
                            </p>

                            <p>
                                <span
                                    ><span
                                        ><strong>浪漫農場春天花園水井</strong><br />
                                        能夠設置於浪漫農場的春天庭園水井. 於浪漫農場設置該水井的期間能力值上升.</span
                                    ></span
                                >
                            </p>

                            <p>
                                <span><span>[*暴擊傷害: +5%](可以油漆, 不可重複套用, 解除設置時能力值上升效果消失.)</span></span>
                            </p>

                            <p>
                                <br />
                                <br />
                                <br />
                                <br />
                                <img src="https://tw.hicdn.beanfun.com/beanfun/WebImage/1770831297110.png" /><br />
                                <br />
                                <span
                                    ><span><strong>浪漫農場春天花園噴泉</strong></span
                                    ><br />
                                    <strong><span>浪漫農場春天花園藤樹</span></strong
                                    ><br />
                                    <br />
                                    <span>能夠設置於浪漫農場的春天庭園噴泉. 於浪漫農場設置該噴泉的期間能力值上升.&nbsp;</span></span
                                >
                            </p>

                            <p>
                                <span><span>[*音樂增益技能效果 +3](可以油漆, 不可重複套用, 解除設置時能力值上升效果消失.)</span></span>
                            </p>

                            <p>
                                <span><span>能夠設置於浪漫農場的春天庭園藤樹. 於浪漫農場設置該藤樹的期間能力值上升.&nbsp;</span></span>
                            </p>

                            <p>
                                <span><span>[*最大傷害值: +7](可以油漆, 不可重複套用, 解除設置時能力值上升效果消失.)</span></span>
                            </p>

                            <p>&nbsp;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}

export default eventAnnouPage;