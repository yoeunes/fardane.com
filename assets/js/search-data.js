// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-عن-الموقع",
    title: "عن الموقع",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-مدونة",
          title: "مدونة",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-التدريس",
          title: "التدريس",
          description: "جاهز للعمل كأستاذ في الجامعة أو الثانوية أو كمدرس خاص.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-الأساتذة",
          title: "الأساتذة",
          description: "أعضاء المختبر أو المجموعة",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "post-صورة-المرأة-في-المجتمع-الواحي-quot-نظام-الأمومة-نموذجا-quot",
      
        title: "صورة المرأة في المجتمع الواحي &quot;نظام الأمومة نموذجا&quot;",
      
      description: "دراسة حول صورة المرأة في المجتمع الواحي مع التركيز على نظام الأمومة.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/women-in-oasis-society/";
        
      },
    },{id: "post-جوانب-من-تدبير-الموارد-المائية-بالواحات-المغربية-خلال-العصر-الوسيط",
      
        title: "جوانب من تدبير الموارد المائية بالواحات المغربية خلال العصر الوسيط",
      
      description: "دراسة شاملة حول تدبير الموارد المائية في الواحات المغربية خلال العصر الوسيط.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/water-management-in-moroccan-oases/";
        
      },
    },{id: "post-تلوات-بين-الرواسب-اللسانية-والأحداث-التاريخية",
      
        title: "تلوات بين الرواسب اللسانية والأحداث التاريخية",
      
      description: "دراسة حول العلاقة بين اسم تلوات والوقائع التاريخية واللغوية المرتبطة بها.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/telouet-linguistic-historical-layers/";
        
      },
    },{id: "post-أغرب-الأطعمة-في-الواحات-المغاربية-خلال-القرنين-الثاني-والثالث-الهجري-الثامن-والتاسع-الميلادي",
      
        title: "أغرب الأطعمة في الواحات المغاربية خلال القرنين الثاني والثالث الهجري/الثامن والتاسع الميلادي",
      
      description: "دراسة حول استهلاك لحوم الذئاب والكلاب في الواحات المغاربية خلال القرنين الثاني والثالث الهجري/الثامن والتاسع الميلادي.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/moroccan-oases-water-management/";
        
      },
    },{id: "post-أيت-سكوكو-رؤية-جديدة-في-دلالات-التسمية",
      
        title: "أيت سكوكو رؤية جديدة في دلالات التسمية",
      
      description: "دراسة حول دلالات تسمية أيت سكوكو وربطها بالوقائع التاريخية.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/ait-sokoko-name-meanings/";
        
      },
    },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
      
        title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
      section: "Posts",
      handler: () => {
        
          window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
        
      },
    },{id: "post-displaying-external-posts-on-your-al-folio-blog",
      
        title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
        
      },
    },{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},];
