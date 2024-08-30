$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const courseID = urlParams.get('CourseID');

    if (!courseID) {
        console.error('CourseID not found in the URL.');
        return;
    }

    $.ajax({
        url: '../../api/studentCourse.php?operation=CourseInfo&CourseID=' + courseID,
        type: 'GET',
        dataType: 'json',
        success: function(response){
            console.log(response);

            if (response && response.length > 0) {
                const userProfilePic = response[0].UserProfilePic;
                console.log(userProfilePic);
                const api = "../../api";
                const fullPath = `${api}/${userProfilePic}`;
                console.log(fullPath);

                const totalSeconds = response[0].VideoMinute * 60 + response[0].VideoSecond;
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                const formattedTime = `${hours}h ${minutes}m ${seconds}s`;

                $('#courseNameDiv').text(response[0].CourseName);
                $('#coursedes').text(response[0].CourseDescription);
                $('#name').text(response[0].UserName);
                $('#photo').attr('src', fullPath);
                $('#videoDurationText').text(formattedTime);  

                let chapterContainer = $("#ChapterCourseIf");
                let existingChapterIds = [];

                $(document).ready(function(){
                    // Your existing code...
                
                    $.each(response, function(index, chapter) {
                        let chapterId = chapter.ChapterID;
                        if (existingChapterIds.includes(chapterId)) {
                            return; // Skip if the chapter already exists
                        }
                        //check if the chapter is duplicate and prevent to be duplicated
                        existingChapterIds.push(chapterId);
                    
                
                        let chapterName = chapter.ChapterName;
                        let chapterDescription1 = chapter.ChapterDescription;
                        console.log(chapterDescription1);
                
                        let chapterDivHtml = `
                            <div id="chapter-${chapterId}" class="border-left-2 page-section pl-32pt">
                                <div class="d-flex align-items-center page-num-container">
                                    <div class="page-num">${chapterId}</div>
                                    <h4>${chapterName}</h4>
                                </div>
                                <p class="text-70 mb-24pt">${chapterDescription1}</p>
                                <div class="card mb-32pt mb-lg-64pt">
                                    <ul class="accordion accordion--boxed js-accordion mb-0" id="toc-${chapterId}">
                                        <li class="accordion__item">
                                            <a class="accordion__toggle" data-toggle="collapse" href="#toc-content-${chapterId}">
                                                <span class="flex">${chapter.ChapterName}</span>
                                                <span class="accordion__toggle-icon material-icons">keyboard_arrow_down</span>
                                            </a>
                                            <ul class="list-unstyled collapse" id="toc-content-${chapterId}">
                                                <!-- Parts will be appended here -->
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>`;
                
                        chapterContainer.append(chapterDivHtml);
                
                        let partContainer = $(`#toc-content-${chapterId}`);
                        $.each(response, function(partIndex, part) {
                            if (part.ChapterID === chapterId) {
                                let partID = part.PartID;
                                console.log("PartID:", partID); // Add this line for debugging
                                
                                let partName = part.PartName;
                                let partVedio = part.VideoMinute;
                        
                                let partDivHtml = `
                                    <li class="accordion__menu-link">
                                        <span class="material-icons icon-16pt icon--left text-body">check_circle</span>
                                        <a class="flex" href="student-take-lesson.html?partID=${partID}">${partName}</a>
                                        <span class="text-muted">${partVedio}</span>
                                    </li>`;
                        
                                partContainer.append(partDivHtml);
                            }
                        });
                        
                        let chapterDescription = chapter.ChapterDescription;
                        console.log(chapterDescription);
                         let chapterDescDiv = 
                         `  <nav class="nav page-nav__menu">
                         <a class="nav-link active"
                            href="">${chapter.ChapterDescription}</a>
                     </nav>`
                     $("#chapterDescription").append(chapterDescDiv)
                    });
                
                
                    
                   
                });
                
            }
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});
