
function showTab(tabId) {
  const allTabs = document.querySelectorAll(".content");
  allTabs.forEach(tab => tab.classList.remove("visible"));
  const buttons = document.querySelectorAll(".tab");
  buttons.forEach(btn => btn.classList.remove("active"));
  const selectedTab = document.getElementById(tabId);
  selectedTab.classList.add("visible");
  event.target.classList.add("active");
}

function tinhLuong() {
  const luongCB = parseFloat(document.querySelector('input[placeholder="Nhập lương cơ bản..."]').value) || 0;
  const ngay = parseInt(document.querySelector('input[placeholder="Nhập số ngày làm việc..."]').value) || 0;
  const thuong = parseFloat(document.querySelector('input[placeholder="Nhập tiền thưởng..."]').value) || 0;
  const phat = parseFloat(document.querySelector('input[placeholder="Nhập tiền phạt..."]').value) || 0;
  const tong = luongCB * ngay + thuong - phat;
  const ketquaDiv = document.getElementById("ketqua");
  ketquaDiv.innerHTML = `<p><strong>Tổng lương:</strong> ${tong.toLocaleString()} VNĐ</p>`;
}
document.getElementById('darkToggle').onclick = function () {
  document.body.classList.toggle('dark-mode');
};
