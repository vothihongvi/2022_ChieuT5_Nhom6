<?php
$username = "root"; // Khai báo username
$password = "";      // Khai báo password
$server   = "localhost";   // Khai báo server
$dbname   = "register";      // Khai báo database



// Kết nối database tintuc
$connect = new mysqli($server, $username, $password, $dbname);

//Nếu kết nối bị lỗi thì xuất báo lỗi và thoát.
if ($connect->connect_error) {
    die("Không kết nối :" . $conn->connect_error);
    exit();
}

$user = $_POST ['user'];
$phone= $_POST ['phone'];
$pass = $_POST ['pass'];
//Khai báo giá trị ban đầu, nếu không có thì khi chưa submit câu lệnh insert sẽ báo lỗi

 $sql = "INSERT INTO info(user, phone, pass) VALUES ('$user', '$phone', '$pass')";
if ($connect->query($sql) === TRUE) {
        echo "Đăng Ký thành công";
    } else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }

 $connect->close();
 ?>

