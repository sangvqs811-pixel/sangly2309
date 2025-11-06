// Dữ liệu nhân viên giả
const employees = [
  { name: "Nguyễn Văn A", dept: "Kinh doanh", role: "Nhân viên", date: "2024-09-10" },
  { name: "Trần Thị B", dept: "Kế toán", role: "Kế toán viên", date: "2024-10-05" },
  { name: "Lê Văn C", dept: "Nhân sự", role: "Chuyên viên", date: "2024-09-20" },
  { name: "Phạm Minh D", dept: "Kỹ thuật", role: "Lập trình viên", date: "2024-09-15" },
  { name: "Hoàng Anh E", dept: "Marketing", role: "Chuyên viên", date: "2024-08-25" },
  { name: "Đỗ Thị F", dept: "Kinh doanh", role: "Trưởng nhóm", date: "2024-09-01" },
  { name: "Ngô Văn G", dept: "Nhân sự", role: "Nhân viên", date: "2024-07-30" },
  { name: "Phan Thị H", dept: "Kỹ thuật", role: "Tester", date: "2024-06-18" },
];

// Hiển thị danh sách nhân viên
const empTable = document.getElementById("empTable");
function renderTable(data) {
  empTable.innerHTML = "";
  data.forEach((emp) => {
    empTable.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.dept}</td>
        <td>${emp.role}</td>
        <td>${emp.date}</td>
      </tr>
    `;
  });
}
renderTable(employees);

// Tìm kiếm nhân viên
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

// Biểu đồ
new Chart(document.getElementById("barChart"), {
  type: "bar",
  data: {
    labels: ["Kinh doanh", "Kế toán", "Nhân sự", "Kỹ thuật", "Marketing"],
    datasets: [
      {
        label: "Số lượng nhân viên",
        data: [30, 20, 25, 35, 15],
        backgroundColor: "#4e73df",
      },
    ],
  },
});

new Chart(document.getElementById("pieChart"), {
  type: "pie",
  data: {
    labels: ["Nam", "Nữ"],
    datasets: [
      {
        data: [70, 55],
        backgroundColor: ["#36b9cc", "#f6c23e"],
      },
    ],
  },
});

// Dark mode
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const icon = darkToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});
