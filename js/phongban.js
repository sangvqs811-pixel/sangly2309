// === Quản lý phòng ban ===

// Lấy các phần tử
const form = document.querySelector("form");
const maPhongInput = document.querySelector("#maPhong");
const tenPhongInput = document.querySelector("#tenPhong");
const tableBody = document.querySelector("table tbody");
const searchInput = document.querySelector("#searchPhongBan");

// Danh sách phòng ban mẫu
let departments = [
  { ma: "IT01", ten: "Phòng CNTT" },
];

// ===== Hiển thị danh sách phòng ban =====
function renderDepartments(list = departments) {
  tableBody.innerHTML = "";
  list.forEach((dep, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${dep.ma}</td>
      <td>${dep.ten}</td>
      <td>
        <i class="fa-solid fa-pen edit" data-index="${index}" style="cursor:pointer;"></i>
        <i class="fa-solid fa-trash delete" data-index="${index}" style="cursor:pointer; margin-left:10px;"></i>

      </td>
    `;
    tableBody.appendChild(row);
  });
}

// ===== Thêm hoặc sửa phòng ban =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const ma = maPhongInput.value.trim();
  const ten = tenPhongInput.value.trim();

  if (!ma || !ten) return alert("Vui lòng nhập đủ thông tin.");

  const existingIndex = departments.findIndex((d) => d.ma === ma);

  if (existingIndex >= 0) {
    departments[existingIndex].ten = ten;
    alert("Đã cập nhật phòng ban!");
  } else {
    departments.push({ ma, ten });
    alert("Thêm phòng ban thành công!");
  }

  form.reset();
  renderDepartments();
});

// ===== Xử lý xóa hoặc sửa =====
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const index = e.target.dataset.index;
    if (confirm("Bạn có chắc muốn xóa phòng ban này?")) {
      departments.splice(index, 1);
      renderDepartments();
    }
  }

  if (e.target.classList.contains("edit")) {
    const index = e.target.dataset.index;
    const dep = departments[index];
    maPhongInput.value = dep.ma;
    tenPhongInput.value = dep.ten;
  }
});

// ===== Tìm kiếm phòng ban =====
searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = departments.filter(
    (dep) =>
      dep.ma.toLowerCase().includes(keyword) ||
      dep.ten.toLowerCase().includes(keyword)
  );
  renderDepartments(filtered);
});

// ===== Khởi tạo =====
renderDepartments();
