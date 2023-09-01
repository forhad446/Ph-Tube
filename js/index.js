const loadCategory = async () => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/categories`
    );
    const data = await res.json();
    const categories = data.data;
    const category_btn = document.getElementById('category_btn');
    const blog_btn = document.getElementById('blog_btn');
    blog_btn.addEventListener('click', function () {
        location.href = './blog.html'
    });
    categories.forEach(categories => {
        const div = document.createElement('div');
        div.innerHTML = `<button onclick="clickBtnHandler('${categories.category_id}')" class="btn">${categories.category}</button>`;
        category_btn.appendChild(div)
    })
}
loadCategory()
// show all video
const loadVideos = async (id = '1000', sortArr) => {
    // console.log(sortArr)
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();
    const allData = data.data;
    // check the length of array that found by forEach Loop
    if (!allData.length) {
        document.getElementById('404_container').classList.remove('hidden')
    }
    else {
        // alert(allData.authors[0].profile_name)
        document.getElementById('404_container').classList.add('hidden')
    }
    const show_all_video_container = document.getElementById('show_all_video_container');
    // clear the show all video container
    show_all_video_container.textContent = '';
    allData.forEach(allData => {

        const seconds = allData.others.posted_date;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const formattedTime = `${hours} hrs, ${minutes} min ago`;

        const div = document.createElement('div');
        div.classList = `overflow-hidden transition-shadow duration-300 bg-white rounded`;
        div.innerHTML = `
            <div class="relative">
                <img src="${allData.thumbnail}" class=" w-full h-64 rounded" alt="" />
                <p
                    class=" mb-2 text-xs font-semibold text-[#FFF] absolute bottom-0 right-3 rounded-md bg-[#171717] p-1">
                    ${allData.others.posted_date ? formattedTime : ''}
                </p>
            </div>
            <div class="py-5 px-2 flex justify-start gap-3">
                <div>
                    <a href="/" aria-label="Author" title="Author" class="mr-3">
                        <img src="${allData.authors[0].profile_picture}"
                            alt="avatar" class="object-cover w-10 h-10 rounded-full shadow-sm" />
                    </a>
                </div>
                <div>
                    <p class="text-xl text-[#171717] font-bold leading-5">${allData.title}</p>
                    <div class="flex gap-3">
                        <p class="text-[#171717b3] text-sm font-normal my-3">
                           ${allData.authors[0].profile_name}
                        </p>
                        <img src="${allData.authors[0].verified ? './img/fi_10629607.svg' : ''}" alt="">
                    </div>
                    <p class="text-[#171717b3] text-sm font-normal ">${allData.others.views}</p>
                </div>
            </div>
        `;
        show_all_video_container.appendChild(div);
    })
    // sortHandle(id);
}
loadVideos()
// clickBtnHandler start
const clickBtnHandler = id => {
    loadVideos(id)
}
// sorting data 
const sortHandle = async (id = '1000') => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();
    const item = data.data;
    item.sort((a, b) => b.others.views.slice(0,3) - a.others.views.slice(0,3))
    // loadVideos(item);
}