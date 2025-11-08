// 热门城市列表（和 Python 一致）
const POPULAR_CITIES = [
    "Beijing", "Shanghai", "New York", "London", "Paris", "Tokyo",
    "Sydney", "Moscow", "Los Angeles", "Singapore", "Seoul", "Berlin",
    "Toronto", "Vancouver", "Bangkok", "Dubai", "São Paulo", "Mumbai",
    "Istanbul", "Sydney"
];

// 1. 生成模拟污染数据（完全复刻 Python 的 generate_pollution_data 函数）
function generatePollutionData(city) {
    const pm25 = Math.floor(Math.random() * 501); // 对应 Python random.randint(0,500)
    let level, color, advice;

    if (pm25 <= 50) {
        level = "Good";
        color = "green";
        advice = "Air quality is excellent, suitable for outdoor activities.";
    } else if (pm25 <= 100) {
        level = "Moderate";
        color = "yellow";
        advice = "Air quality is acceptable, but sensitive groups should reduce outdoor activities.";
    } else if (pm25 <= 150) {
        level = "Unhealthy for Sensitive Groups";
        color = "orange";
        advice = "Sensitive groups should avoid prolonged outdoor activities.";
    } else if (pm25 <= 200) {
        level = "Unhealthy";
        color = "red";
        advice = "Reduce outdoor activities; sensitive groups should stay indoors.";
    } else if (pm25 <= 300) {
        level = "Very Unhealthy";
        color = "purple";
        advice = "Everyone should minimize outdoor activities.";
    } else {
        level = "Hazardous";
        color = "maroon";
        advice = "Close windows and avoid all outdoor activities.";
    }

    // 生成其他污染物数据（和 Python 随机逻辑一致）
    const pm10 = Math.floor(Math.random() * 301);
    const o3 = Math.floor(Math.random() * 201);
    const no2 = Math.floor(Math.random() * 101);
    const so2 = Math.floor(Math.random() * 51);
    const co = Math.round(Math.random() * 10 * 10) / 10;

    // 格式化更新时间（和 Python datetime 逻辑一致）
    const now = new Date();
    const updated = now.toLocaleString("en-US", {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    return { city, pm25, pm10, o3, no2, so2, co, level, color, advice, updated };
}

// 2. 搜索城市并渲染结果（复刻 Python 的 /search 路由逻辑）
function searchCity(cityName) {
    const city = cityName.trim();
    if (!city) return;

    const data = generatePollutionData(city);
    const resultsContent = `
        <h2>Real-time Pollution Index - ${data.city}</h2>
        <p>Last updated: ${data.updated}</p>

        <div class="main-pollution">
            <div class="pm25-card">
                <h3>PM2.5 Index</h3>
                <div class="pm25-value ${data.color}">${data.pm25}</div>
                <div>Air Quality: <span class="${data.color}" style="color: white; padding: 3px 8px; border-radius: 4px;">${data.level}</span></div>
            </div>

            <div class="health-advice">
                <h3>Health Advice</h3>
                <p>${data.advice}</p>
            </div>
        </div>

        <div style="background: white; border-radius: 10px; padding: 2rem; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
            <h3>Detailed Pollutant Data</h3>
            <div class="pollutants-grid">
                <div class="pollutant-card">
                    <h4>PM10</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #3498db;">${data.pm10} μg/m³</div>
                    <div>Inhalable Particles</div>
                </div>
                <div class="pollutant-card">
                    <h4>Ozone (O₃)</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #3498db;">${data.o3} μg/m³</div>
                </div>
                <div class="pollutant-card">
                    <h4>Nitrogen Dioxide (NO₂)</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #3498db;">${data.no2} μg/m³</div>
                </div>
                <div class="pollutant-card">
                    <h4>Sulfur Dioxide (SO₂)</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #3498db;">${data.so2} μg/m³</div>
                </div>
                <div class="pollutant-card">
                    <h4>Carbon Monoxide (CO)</h4>
                    <div style="font-size: 1.8rem; font-weight: bold; color: #3498db;">${data.co} mg/m³</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 2rem;">
            <h3>Search Other Cities</h3>
            <div class="city-tags">
                ${POPULAR_CITIES.slice(0,5).map(c => `<a href="javascript:searchCity('${c}')">${c}</a>`).join('')}
            </div>
        </div>
    `;

    // 切换显示页面
    document.getElementById("searchSection").style.display = "none";
    document.getElementById("resultsSection").style.display = "block";
    document.getElementById("resultsContent").innerHTML = resultsContent;
}

// 3. 处理搜索表单提交（复刻 Python 的 do_GET 表单逻辑）
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const cityInput = this.querySelector('input[name="city"]');
    searchCity(cityInput.value);
    cityInput.value = "";
});

// 4. 返回搜索页
function backToSearch() {
    document.getElementById("resultsSection").style.display = "none";
    document.getElementById("searchSection").style.display = "block";
}