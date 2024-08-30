

$(document).ready(function(){
    const urlParams = new URLSearchParams(window.location.search);
    const courseID = urlParams.get('CourseID');
    $('#watch-trailer-button').attr('href', `student-take-course.html?CourseID=${courseID}`);

     // Function to redirect to student-take-course.html with courseID
 
    
    if (!courseID) {
        console.error('CourseID not found in the URL.');

        return;
    }

    $.ajax({
      url: '../../api/studentCourse.php?operation=CourseInfo&CourseID=' + courseID,
        type: 'Get',
        dataType: 'json', // Specify the expected data type
        success: function(response){
            console.log(response);
            const api = '../../api';

    // Concatenate the base API URL with the UserProfilePic variable

            // Check if 'CourseName' exists in the response
            if (response && response[0] && response[0].CourseName) {
                // Update the content of the element with the id "courseNameDiv"
                const UserProfilePic = response[0].UserProfilePic;
                const imageUrl = `${api}/${UserProfilePic}`;
                const totalSeconds = response[0].VideoMinute * 60 + response[0].VideoSecond;

                // Calculate hours, minutes, and remaining seconds
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                
                // Format the time as HH:MM:SS
                const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
                
                $('#courseNameDiv').text(response[0].CourseName);
                $('#coursedes').text(response[0].CourseDescription);
                $('#name').text(response[0].UserName);
                $('#photo').attr('src', imageUrl);
                $('#videoDurationText').text(formattedTime);  

                
                let chapterContainer = $("#ChapterCourseInfo");
                $.each(response, function(index, chapter) {
                    let chapterId = chapter.ChapterID;
                    console.log(chapterId);
                    let chapterName = chapter.ChapterName;
                    console.log(chapterName);
                    let partID = chapter.PartID;
                    let partName = chapter.PartName;
                    console.log(partName);
                    

    // Check if the chapter already exists in the container
    let existingChapter = chapterContainer.find(`#chapter-${chapterId}`);
    if (partName) {

    if (existingChapter.length === 0) {
        // Chapter does not exist, create the chapter structure
        let chapterHtml = `
            <div class="accordion js-accordion accordion--boxed list-group-flush" id="parent">
                <div class="accordion__item open" id="chapter-${chapterId}">
                    <a href="#" class="accordion__toggle" data-toggle="collapse" data-target="#course-toc-${chapterId}" data-parent="#parent">
                        <span class="flex">${chapterName}</span> 
                        <span class="accordion__toggle-icon material-icons">keyboard_arrow_down</span>
                    </a>
                    <div class="accordion__menu collapse show" id="course-toc-${chapterId}"></div>
                </div>
            </div>`;

        // Append the chapter structure to the container
        chapterContainer.append(chapterHtml);
    }

    // Append the part to the corresponding chapter
    let partHtml = `
        <div class="accordion__menu-link">
            <span class="icon-holder icon-holder--small icon-holder--dark rounded-circle d-inline-flex icon--left">
                <i class="material-icons icon-16pt">check_circle</i>
            </span>
            <a href="#" class="flex" >${partName}</a>
            <span class="text-muted">8m 42s</span>
           
        </div>`;

    $(`#course-toc-${chapterId}`).append(partHtml);
}

});


            } else {
                console.error('CourseName not found in the response.');
            }

        },

        error: function (xhr, status, error) {
            console.error(xhr.status + ' ' + xhr.statusText + ': ' + error);
        } 
    });   
});