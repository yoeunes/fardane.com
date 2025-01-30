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
        },{id: "post-دور-الماء-في-العمران-والحضارة-من-خلال-كتاب-نزهة-المشتاق-للإدريسي",
      
        title: "دور الماء في العمران والحضارة من خلال كتاب نزهة المشتاق للإدريسي",
      
      description: "دراسة تحليلية نقدية لأهمية الموارد المائية في تشييد المدن وتطور العمران من خلال مصدر جغرافي وسيط",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/water-in-sources/";
        
      },
    },{id: "post-الطرق-الدينية-والصوفية-بالمغرب",
      
        title: "الطرق الدينية والصوفية بالمغرب",
      
      description: "تحليل شامل لدور الطرق الصوفية والزوايا في المغرب، مع استعراض تاريخ التصوف ومراحله المختلفة وتأثيره على المجتمع.",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/religious-and-sufi-orders-in-morocco/";
        
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
