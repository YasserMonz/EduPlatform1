$(document).ready(function(){
    
    const TopViewed = "TopViewed";
    const Latest = "Latest";
    const Random = "Random";

    //TopViewed
    $.ajax({
        url: "../../api/GetCoursesInfo.php",
        data: {
            operation: TopViewed
        },
        type: "get",
        
        success: function (response) {
            let courselist =  JSON.parse(response);
            //console.log(response);
            // Iterate over each course using $.each
            $.each(courselist, function (index, course) {
                // Extract individual values into variables:
                let courseID = course.CourseID;

                let coursename = course.CourseName;
                //console.log(coursename);

                let portalname = course.PortalName;
                //console.log(portalname);

                let numberofviews = course.NumberofViews;
                //console.log(numberofviews);

                let userprofilepic = course.UserProfilePic;
                //console.log(userprofilpic);

                let CourseDivTop = `<div class="col-md-6 col-lg-4 card-group-row__col">

                        <div class="card card--elevated posts-card-popular overlay card-group-row__card">
                            <img src="../../public/images/paths/sketch_430x168.png"
                                alt=""
                                class="card-img">
                            <div class="fullbleed bg-primary"
                                style="opacity: .5"></div>
                            <div class="posts-card-popular__content">
                                <div class="card-body d-flex align-items-center">

                                    <div class="avatar-group flex">
                                        <div class="avatar avatar-xs" data-toggle="tooltip" data-placement="top" title="">
                                            <a href="">
                                                <img src="../../api/${userprofilepic}" alt="Avatar" class="avatar-img rounded-circle" style="width:50px; height: 50px;">
                                            </a>
                                        </div>
                                    </div>

                                    <a style="text-decoration: none;" class="d-flex align-items-center" href="">
                                        <i class="material-icons mr-1" style="font-size: inherit;">remove_red_eye</i>
                                        <small>${numberofviews}</small>
                                    </a>
                                </div>

                                <div class="posts-card-popular__title card-body">
                                    <small class="text-muted text-uppercase">${portalname}</small>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <a class="card-title" href="student-course.html">${coursename}</a>
                                        <a class="card-title" href="student-course.html?CourseID=${courseID}">
                                            <small class="text-muted text-uppercase">more</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>`;

                // Update the CourseDiv with dynamic values
                // let dynamicCourseDivTop = $(CourseDivTop);
                // dynamicCourseDivTop.find("#TopCoursePortal").text(portalname);
                // dynamicCourseDivTop.find("#TopCourseName").text(coursename);

                // Append the dynamicCourseDiv to the desired container
                $("#TopCourses").append(CourseDivTop);
            });
            
        },
        
        error: function (E) {
            alert(E.status + E.statusText)
        }
        
    });

    
        //Latest
        $.ajax({
            url: "../../api/GetCoursesInfo.php",
            data: {
                operation: Latest
            },
            type: "get",
            
            success: function (response) {
                let Latestdata =  JSON.parse(response);
                 //console.log(response);
                // Iterate over each course using $.each
                $.each(Latestdata, function (index, course) {
                    // Extract individual values into variables:
                //  let coursename = course.CourseName;
                 //console.log(coursename);

                let portalname = course.PortalName;
                 //console.log(portalname);
                let coursename = course.CourseName;

                let coursedescription = course.CourseDescription;
                 //console.log(coursedescription);
                let imgurl = course.ImageURL
                    let CourseDivLatest = `<div class="col-sm-4 card-group-row__col">

                                <div class="card js-overlay card-sm overlay--primary-dodger-blue stack stack--1 card-group-row__card"
                                    data-toggle="popover"
                                    data-trigger="click">

                                    <div class="card-body d-flex flex-column">
                                        <div class="d-flex align-items-center">
                                            <div class="flex">
                                                <div class="d-flex align-items-center">
                                                    <div class="rounded mr-12pt z-0 o-hidden">
                                                        <div class="overlay">
                                                            <img src="../../public/images/paths/react_40x40@2x.png"
                                                                width="40"
                                                                height="40"
                                                                alt="Angular"
                                                                class="rounded">
                                                            <span class="overlay__content overlay__content-transparent">
                                                                <span class="overlay__action d-flex flex-column text-center lh-1">
                                                                    <small class="h6 small text-white mb-0"
                                                                        style="font-weight: 500;">80%</small>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="flex">
                                                        <div class="card-title">${coursename}</div>
                                                        <p class="flex text-50 lh-1 mb-0"><small>${portalname}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="student-path.html"
                                                    data-toggle="tooltip"
                                                    data-title="info"
                                                    data-placement="top"
                                                    data-boundary="window"
                                                    class="ml-4pt material-icons text-20 card-course__icon-favorite ">more</a>

                                        </div>

                                    </div>
                                </div>

                                <div class="popoverContainer d-none">
                                    <div class="media">
                                        <div class="media-left mr-12pt">
                                            <img src="../../public/images/paths/react_40x40@2x.png"
                                                width="40"
                                                height="40"
                                                alt="Angular"
                                                class="rounded">
                                        </div>
                                        <div class="media-body">
                                            <div class="card-title">${coursename}</div>
                                            <p class="text-50 d-flex lh-1 mb-0 small">${portalname}</p>
                                        </div>
                                    </div>

                                    <p class="mt-16pt text-70">${coursedescription}</p>

                                    <div class="my-32pt">
                                        <div class="d-flex align-items-center mb-8pt justify-content-center">
                                            <div class="d-flex align-items-center mr-8pt">
                                                <span class="material-icons icon-16pt text-50 mr-4pt">access_time</span>
                                                <p class="flex text-50 lh-1 mb-0"><small>50 minutes left</small></p>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <span class="material-icons icon-16pt text-50 mr-4pt">play_circle_outline</span>
                                                <p class="flex text-50 lh-1 mb-0"><small>12 lessons</small></p>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-center">
                                            <a href="student-path.html"
                                            class="btn btn-primary mr-8pt">Resume</a>
                                            <a href="student-path.html"
                                            class="btn btn-outline-secondary ml-0">Start over</a>
                                        </div>
                                    </div>

                                    <div class="d-flex align-items-center">
                                        <small class="text-50 mr-8pt">Your rating</small>
                                        <div class="rating mr-8pt">
                                            <span class="rating__item"><span class="material-icons text-primary">star</span></span>
                                            <span class="rating__item"><span class="material-icons text-primary">star</span></span>
                                            <span class="rating__item"><span class="material-icons text-primary">star</span></span>
                                            <span class="rating__item"><span class="material-icons text-primary">star</span></span>
                                            <span class="rating__item"><span class="material-icons text-primary">star_border</span></span>
                                        </div>
                                        <small class="text-50">4/5</small>
                                    </div>
                                </div>

                            </div>`;

                        // Update the CourseDiv with dynamic values
                        // let dynamicCourseDivLatest = $(CourseDivLatest);
                        // dynamicCourseDivLatest.find("#LatestCoursePortal").text(portalname);
                        // dynamicCourseDivLatest.find("#LatestCourseName").text(coursename);
                        // dynamicCourseDivLatest.find("#LatestCourseDescription").text(coursedescription);

                 // Append the dynamicCourseDiv to the desired container
                 $("#LatestCourses").append(CourseDivLatest);
             });
            
            },
            error: function (E) {
                alert(E.status + E.statusText)
            }
        });

         //Random
                $.ajax({
                    url: "../../api/GetCoursesInfo.php",
                    data: {
                        operation: Random
                    },
                    type: "post",
            
                    success: function (response) {
                    let Randomcourselist = JSON.parse(response);

                    
                     //console.log(response);
             // Iterate over each course using $.each
                $.each(Randomcourselist, function (index, course) {
                 // Extract individual values into variables:
                let coursename = course.CourseName;
                 //console.log(coursename);

                let portalname = course.PortalName;
                 //console.log(portalname);

                let coursedescription = course.CourseDescription;
                 //console.log(coursedescription);

                let CourseDivRandom = `<div class="col-md-6 col-lg-4 col-xl-4 card-group-row__col">

                                <div class="card card-sm card--elevated p-relative o-hidden overlay overlay--primary-dodger-blue js-overlay card-group-row__card"
                                    data-toggle="popover"
                                    data-trigger="click">

                                    <a href="student-course.html"
                                    class="card-img-top js-image"
                                    data-position=""
                                    data-height="140">
                                        <img src="../../public/images/paths/sketch_430x168.png"
                                            alt="course">
                                        <span class="overlay__content">
                                            <span class="overlay__action d-flex flex-column text-center">
                                                <i class="material-icons icon-32pt">play_circle_outline</i>
                                                <span class="card-title text-white">Preview</span>
                                            </span>
                                        </span>
                                    </a>

                                    <div class="card-body flex">
                                        <div class="d-flex">
                                            <div class="flex">
                                                <a class="card-title"
                                                href="student-course.html">${coursename}</a>
                                                <small class="text-50 font-weight-bold mb-4pt">${portalname}</small>
                                            </div>
                                            <a href="student-course.html"
                                            data-toggle="tooltip"
                                            data-title="Add Favorite"
                                            data-placement="top"
                                            data-boundary="window"
                                            class="ml-4pt material-icons text-20 card-course__icon-favorite">favorite_border</a>
                                        </div>
                                        <div class="d-flex">
                                            <div class="rating flex">
                                                <span class="rating__item"><span class="material-icons">star</span></span>
                                                <span class="rating__item"><span class="material-icons">star</span></span>
                                                <span class="rating__item"><span class="material-icons">star</span></span>
                                                <span class="rating__item"><span class="material-icons">star</span></span>
                                                <span class="rating__item"><span class="material-icons">star_border</span></span>
                                            </div>
                                            <!-- <small class="text-50">6 hours</small> -->
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div class="row justify-content-between">
                                            <div class="col-auto d-flex align-items-center">
                                                <span class="material-icons icon-16pt text-50 mr-4pt">access_time</span>
                                                <p class="flex text-50 lh-1 mb-0"><small>6 hours</small></p>
                                            </div>
                                            <div class="col-auto d-flex align-items-center">
                                                <span class="material-icons icon-16pt text-50 mr-4pt">play_circle_outline</span>
                                                <p class="flex text-50 lh-1 mb-0"><small>12 lessons</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="popoverContainer d-none">
                                    <div class="media">
                                        <div class="media-left mr-12pt">
                                            <img src="../../public/images/paths/sketch_40x40@2x.png"
                                                width="40"
                                                height="40"
                                                alt="Angular"
                                                class="rounded">
                                        </div>
                                        <div class="media-body">
                                            <div class="card-title mb-0">${coursename}</div>
                                            <p class="lh-1 mb-0">
                                                <span class="text-50 small font-weight-bold">${portalname}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <p class="my-16pt text-70">${coursedescription}</p>

                                    <div class="mb-16pt">
                                        <div class="d-flex align-items-center">
                                            <span class="material-icons icon-16pt text-50 mr-8pt">check</span>
                                            <p class="flex text-50 lh-1 mb-0"><small>Fundamentals of working with Angular</small></p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span class="material-icons icon-16pt text-50 mr-8pt">check</span>
                                            <p class="flex text-50 lh-1 mb-0"><small>Create complete Angular applications</small></p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span class="material-icons icon-16pt text-50 mr-8pt">check</span>
                                            <p class="flex text-50 lh-1 mb-0"><small>Working with the Angular CLI</small></p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span class="material-icons icon-16pt text-50 mr-8pt">check</span>
                                            <p class="flex text-50 lh-1 mb-0"><small>Understanding Dependency Injection</small></p>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <span class="material-icons icon-16pt text-50 mr-8pt">check</span>
                                            <p class="flex text-50 lh-1 mb-0"><small>Testing with Angular</small></p>
                                        </div>
                                    </div>

                                    <div class="row align-items-center">
                                        <div class="col-auto">
                                            <div class="d-flex align-items-center mb-4pt">
                                                <span class="material-icons icon-16pt text-50 mr-4pt">access_time</span>
                                                <p class="flex text-50 lh-1 mb-0"><small>6 hours</small></p>
                                            </div>
                                            <div class="d-flex align-items-center mb-4pt">
                                                <span class="material-icons icon-16pt text-50 mr-4pt">play_circle_outline</span>
                                                <p class="flex text-50 lh-1 mb-0"><small>12 lessons</small></p>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <span class="material-icons icon-16pt text-50 mr-4pt">assessment</span>
                                                <p class="flex text-50 lh-1 mb-0"><small>Beginner</small></p>
                                            </div>
                                        </div>
                                        <div class="col text-right">
                                            <a href="student-course.html"
                                            class="btn btn-primary">Watch trailer</a>
                                        </div>
                                    </div>

                                </div>

                            </div>`;

                    // Update the CourseDiv with dynamic values
//                 // let dynamicCourseDivRandom = $(CourseDivRandom);
//                 // dynamicCourseDivRandom.find("#RandomCoursePortal").text(portalname);
//                 // dynamicCourseDivRandom.find("#RandomCourseName").text(coursename);
//                 // dynamicCourseDivRandom.find("#RandomCourseDescription").text(coursedescription);

//                 // Append the dynamicCourseDiv to the desired container
                $("#RandomCourses").append(CourseDivRandom);
            });
            
            },
        error: function (E) {
            alert(E.status + E.statusText)
        }
    });

//     // for (let i = 0 ; i < CoursesNumber ; i++){
//             //     // Access and use the returned data here:

//             //     let course = response[i];
                    
//             //     // Extract individual values into variables:

//             //     let courseID = course.CourseID;
//             //     console.log(courseID);
        
//             //     let coursename = course.CourseName;
//             //     //$(CourseBox).html(coursename);
//             //     console.log(coursename);
        
//             //     let coursedescription = course.CourseDescription;
//             //     //$("#FirstName").val(userFirstName);
//             //     console.log(coursedescription);
        
//             //     let courseprice = course.CoursePrice;
//             //     //$("#MiddleName").val(userMiddleName);
//             //     console.log(courseprice);

//             //     // Assuming user is defined and contains DateofBirth and JoinDate properties
//             //     if (course && course.CreateDate && course.CreateDate.date) {
//             //         let createdate = new Date(course.CreateDate.date);
//             //         let formattedCreateDate = createdate.getFullYear() + '-' + ('0' + (createdate.getMonth() + 1)).slice(-2) + '-' + ('0' + createdate.getDate()).slice(-2);
//             //         //$("#DateofBirth").val(formattedCreateDate);
//             //         console.log(formattedCreateDate);
//             //     } else {
//             //         console.error("Invalid or missing CreateDate property in the user object.");
//             //     }
        
//             //     let portalID = course.PortalID;
//             //     //$("#Course1Portal").html(portalID);
//             //     console.log(portalID);
        
//             //     let portalname = course.PortalName;
//             //     //$(CourseBoxPortal).html(portalname);
//             //     console.log(portalname);
        
//             //     let userID = course.UserID;
//             //     //$("#Password").val(userPassword);
//             //     console.log(userID);
        
//             //     let trainername = course.TrainerName;
//             //     //$("#Email").val(userEmail);
//             //     console.log(trainername);
        
//             //     let numberofviews = course.NumberofViews;
//             //     //$("#PhoneNumber").val(userTelephone);
//             //     console.log(numberofviews);
                    
//             //     // ... repeat for other properties
//             // }

//
 });