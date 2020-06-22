# algorithmDocumentsSearch
Tìm kiếm tài liệu phân tích và thiết kế thuật toán

<h1>Yêu cầu</h1>
<ul>
    <li>Python 2</li>
</ul>


<h1>Chạy project</h1>
<ol>
    <li>Đi đến thư mục project</li>
    <li>python -m SimpleHTTPServer 7979</li>
</ol>
<p>
    <i>Truy cập localhost:7979 để thấy kết quả</i>
</p>

<img src="/static/image/overview.png">
<img src="/static/image/tags.png">



<h1>Cấu hình data</h1>
<pre>
    <code>
[
    {
        "menucode": "TongQuanDLVaCTDL",
        "menuname": "Tổng quan DL và CTDL",
        "menuchildren": [
            {
                "menucode": "CacChienLuocThietKeCuaGiaiThuat",
                "menuurl": "/index.html?idmenu=CacChienLuocThietKeCuaGiaiThuat",
                "menuname": "Các chiến lược thiết kế của giải thuật",
                "menuchildren": [],
                "contenturl": "/document/CauTrucDuLieuDong/DanhSachLienKet/KhaiNiemDanhSach.txt",
                "pdfurl": "/document/CauTrucDuLieuDong/DanhSachLienKet/Chuong-01-2018.pdf",
                "menuicon": "fal fa-chevron-double-right",
                "menudes": "Các chiến lược thiết kế của giải thuật",
                "menutags": "chiến lược thiết kế"
            },
            {
                "menucode": "CauTrucDuLieu",
                "menuurl": "/index.html?idmenu=CauTrucDuLieu",
                "menuname": "Cấu trúc dữ liệu",
                "contenturl": "/document/CauTrucDuLieuDong/DanhSachLienKet/KhaiNiemDanhSach.txt",
                "pdfurl": "/document/CauTrucDuLieuDong/DanhSachLienKet/Chuong-05.pdf",
                "menuchildren": [],
                "menuicon": "fal fa-chevron-double-right",
                "menudes": "Cấu trúc dữ liệu",
                "menutags": "cấu trúc dữ liệu"
            },
            {
                "menucode": "3_3",
                "menuurl": "/index.html?idmenu=intro2",
                "menuname": "Độ phức tạp của giải thuật",
                "menuchildren": [],
                "menuicon": "fal fa-chevron-double-right",
                "menudes": "Độ phức tạp của giải thuật",
                "menutags": "độ phức tạp"
            }
        ],
        "menuicon": "fal fa-chevron-right",
        "menudes": "Toàn vẹn và xác thực",
        "menutags": "tổng quan,thiết kế,cấu trúc,độ phức tạp"
    }
]
    </code>
</pre>

<ol>
    <li>menucode: id của menu( là duy nhất trong menu data )</li>
    <li>menuname: tên hiển thị của menu( còn dùng cho search theo bài học )</li>
    <li>menuurl: link trang khi click vào menu
        <ul>
            <li>Menu cha không có menuurl</li>
            <li>Nội dung thường là /index.html?idmenu=CacChienLuocThietKeCuaGiaiThuat với menuid là menucode của một menu item</li>
        </ul>
    </li>
    <li>menuchildren: thể hiện mối quan hệ cha con của cây menu</li>
    <li>contenturl: thể hiện nội dung của trang dạng text( dùng để search nội dung, từ khóa )</li>
    <li>pdfurl: thể hiện nội dung của menu nhưng dạng pdf hoặc doc để cho đẹp hơn</li>
    <li>menuicon: icon của menu theo chuẩn font awesome</li>
    <li>menudes: mô tả nội dung của menu( khi rê chuột vào sẽ thấy )</li>
    <li>menutags: các nội dung liên quan( dùng để search liên quan )</li>
</ol>
