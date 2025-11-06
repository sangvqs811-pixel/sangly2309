$(function () {
  const table = $('#tableBaoCao').DataTable({
    dom: 'Bfrtip',
    searching: false,
    info: false,
    buttons: [
      { extend: 'excelHtml5', text: '📗 Xuất Excel' },
      { extend: 'pdfHtml5', text: '📕 Xuất PDF' },
      { extend: 'print', text: '🖨️ In Báo Cáo' }
    ],
  });

  // Khi thay đổi ô lọc
  $('#filterPhongBan, #filterChucVu').on('change', function () {
    const phongban = $('#filterPhongBan').val();
    const chucvu = $('#filterChucVu').val();

    // Reset lại danh sách option gốc
    $('#filterPhongBan option:first').text('Lọc theo phòng ban');
    $('#filterChucVu option:first').text('Lọc theo chức vụ');

    // Nếu có lựa chọn -> đổi text hiển thị
    if (phongban) {
      $('#filterPhongBan option:selected').text('Phòng ban: ' + phongban);
    }
    if (chucvu) {
      $('#filterChucVu option:selected').text('Chức vụ: ' + chucvu);
    }

    // Lọc dữ liệu
    table.column(2).search(phongban).column(3).search(chucvu).draw();
  });
  $('#searchInput').on('keyup', function () {
  table.search(this.value).draw();
  });
});

