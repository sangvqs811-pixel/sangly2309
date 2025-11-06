// Mảng lưu trữ danh sách nhân viên
        let employees = JSON.parse(localStorage.getItem('employees')) || [];
        let currentEditId = null;

        // Hiển thị thông báo
        function showNotification(message, type) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }

        // Hiển thị danh sách nhân viên
        function displayEmployees() {
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = '';
            
            employees.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.age}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.department}</td>
                    <td>${employee.position}</td>
                    <td>${formatCurrency(employee.salary)}</td>
                    <td class="actions-cell">
                        <button class="btn btn-primary btn-edit" data-id="${employee.id}">Sửa</button>
                        <button class="btn btn-danger btn-delete" data-id="${employee.id}">Xóa</button>
                    </td>
                `;
                employeeList.appendChild(row);
            });
            
            // Thêm sự kiện cho các nút sửa và xóa
            document.querySelectorAll('.btn-edit').forEach(button => {
                button.addEventListener('click', function() {
                    editEmployee(this.getAttribute('data-id'));
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    deleteEmployee(this.getAttribute('data-id'));
                });
            });
        }

        // Định dạng tiền tệ
        function formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        }

        // Thêm nhân viên mới
        document.getElementById('employeeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const employeeId = document.getElementById('employeeId').value;
            const fullName = document.getElementById('fullName').value;
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const department = document.getElementById('department').value;
            const position = document.getElementById('position').value;
            const salary = document.getElementById('salary').value;
            
            // Kiểm tra mã nhân viên đã tồn tại chưa
            if (employees.some(emp => emp.id === employeeId) && currentEditId !== employeeId) {
                showNotification('Mã nhân viên đã tồn tại!', 'error');
                return;
            }
            
            if (currentEditId) {
                // Cập nhật nhân viên
                const index = employees.findIndex(emp => emp.id === currentEditId);
                employees[index] = {
                    id: employeeId,
                    name: fullName,
                    age: age,
                    gender: gender,
                    department: department,
                    position: position,
                    salary: salary
                };
                showNotification('Cập nhật thông tin nhân viên thành công!', 'success');
                resetForm();
            } else {
                // Thêm nhân viên mới
                employees.push({
                    id: employeeId,
                    name: fullName,
                    age: age,
                    gender: gender,
                    department: department,
                    position: position,
                    salary: salary
                });
                showNotification('Thêm nhân viên mới thành công!', 'success');
                this.reset();
            }
            
            // Lưu vào localStorage
            localStorage.setItem('employees', JSON.stringify(employees));
            
            // Hiển thị lại danh sách
            displayEmployees();
        });

        // Sửa thông tin nhân viên
        function editEmployee(id) {
            const employee = employees.find(emp => emp.id === id);
            if (employee) {
                document.getElementById('employeeId').value = employee.id;
                document.getElementById('fullName').value = employee.name;
                document.getElementById('age').value = employee.age;
                document.getElementById('gender').value = employee.gender;
                document.getElementById('department').value = employee.department;
                document.getElementById('position').value = employee.position;
                document.getElementById('salary').value = employee.salary;
                
                currentEditId = id;
                document.querySelector('button[type="submit"]').style.display = 'none';
                document.getElementById('updateBtn').style.display = 'inline-block';
                document.getElementById('cancelBtn').style.display = 'inline-block';
            }
        }

        // Xóa nhân viên
        function deleteEmployee(id) {
            if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
                employees = employees.filter(emp => emp.id !== id);
                localStorage.setItem('employees', JSON.stringify(employees));
                displayEmployees();
                showNotification('Xóa nhân viên thành công!', 'success');
                
                // Nếu đang chỉnh sửa nhân viên bị xóa, reset form
                if (currentEditId === id) {
                    resetForm();
                }
            }
        }

        // Tìm kiếm nhân viên
        document.getElementById('searchBtn').addEventListener('click', function() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const filteredEmployees = employees.filter(emp => 
                emp.id.toLowerCase().includes(searchTerm) || 
                emp.name.toLowerCase().includes(searchTerm) ||
                emp.department.toLowerCase().includes(searchTerm) ||
                emp.position.toLowerCase().includes(searchTerm)
            );
            
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = '';
            
            filteredEmployees.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.age}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.department}</td>
                    <td>${employee.position}</td>
                    <td>${formatCurrency(employee.salary)}</td>
                    <td class="actions-cell">
                        <button class="btn btn-primary btn-edit" data-id="${employee.id}">Sửa</button>
                        <button class="btn btn-danger btn-delete" data-id="${employee.id}">Xóa</button>
                    </td>
                `;
                employeeList.appendChild(row);
            });
            
            // Thêm sự kiện cho các nút sửa và xóa
            document.querySelectorAll('.btn-edit').forEach(button => {
                button.addEventListener('click', function() {
                    editEmployee(this.getAttribute('data-id'));
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    deleteEmployee(this.getAttribute('data-id'));
                });
            });
        });

        // Reset form
        function resetForm() {
            document.getElementById('employeeForm').reset();
            currentEditId = null;
            document.querySelector('button[type="submit"]').style.display = 'inline-block';
            document.getElementById('updateBtn').style.display = 'none';
            document.getElementById('cancelBtn').style.display = 'none';
        }

        // Sự kiện cho nút cập nhật
        document.getElementById('updateBtn').addEventListener('click', function() {
            document.getElementById('employeeForm').dispatchEvent(new Event('submit'));
        });

        // Sự kiện cho nút hủy
        document.getElementById('cancelBtn').addEventListener('click', resetForm);

        // Khởi tạo hiển thị danh sách nhân viên
        displayEmployees();