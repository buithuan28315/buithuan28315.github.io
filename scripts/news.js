"use strict";

if (userActive) {
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  // Tính số news Tối đa trả về từ API
  let totalResults = 0;

  getDataNew("us", 1);
  // Hàm : lấy dữ liệu Data News từ API và hiển thị list News ra ứng dụng
  async function getDataNew(country, page) {
    try {
      const res = await fetch(
        // `https://newsapi.org/v2/top-headlines?coutry=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=08a64b396052467991ff34e71083784a`
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=08a64b396052467991ff34e71083784a`
      );
      const data = await res.json();

      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      if (data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      displayNewList(data);
    } catch (err) {
      // thông báo lỗi
      alert("Error: " + err.message);
    }
  }

  // Hàm: kiểm tra điều kiện ấn và ấn nút Previous
  function checkBtnPrev() {
    // Nếu page Number là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  // Hàm: kiểm tra điều kiện ấn và ấn nút next
  function checkBtnNext() {
    if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  // bắt sự kiện click vào nút previous
  btnPrev.addEventListener("click", function () {
    getDataNew("us", --pageNum.textContent);
  });

  // bắt sự kiện click vào nút Next
  btnNext.addEventListener("click", function () {
    getDataNew("us", ++pageNum.textContent);
  });

  function displayNewList(data) {
    totalResults = data.totalResults;

    checkBtnNext();
    checkBtnPrev();

    let html = "";
    // tạo các code HTML các News để hiển thị
    data.articles.forEach(function (article) {
      html += `
      <div class="card flex-row flex-wrap">
					<div class="card mb-3" style="">
						<div class="row no-gutters">
							<div class="col-md-4">
								<img src=${
                  article.urlToImage
                    ? article.urlToImage
                    : "imgNo-Image-Found-400x264.png"
                }
									class="card-img"
									alt="Null">
							</div>
							<div class="col-md-8">
								<div class="card-body">
									<h5 class="card-title">${article.title}</h5>
									<p class="card-text">${article.description}</p>
									<a href=${article.url} target="_blank"
										class="btn btn-primary">View</a>
								</div>
							</div>
						</div>
					</div>
				</div>
      `;
    });

    newsContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng đăng nhập / đăng ký để truy cập ứng dụng");
  window.location.assign("../index.html");
}
