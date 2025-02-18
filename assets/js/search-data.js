// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-الموقع",
    title: "الموقع",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-المقالات",
          title: "المقالات",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-المسار",
          title: "المسار",
          description: "دكتور متخصص في التاريخ الوسيط",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-الشخصيات",
          title: "الشخصيات",
          description: "شهاب الدين القرافي أحمد بن إدريس بن عبد الرحمان بن عبد الله بن يلين الصنهاجي، الملقب بشهاب الدين، المعروف بالقرافي والمالكي، &quot;من علماء المالكية نسبته إلى قبيلة صنهاجة من أمازيغ المغرب.&quot; اختلف في نسبه وقد اتفق مترجموه على أن ينسب للقرافة ولم يسكنها...يرجح أن النسبة الأصلية المتفق عليها للمؤلف هي الصنهاجي، وصنهاجة من أكبر قبائل البربر بجنوب المغرب الأقصى. هذه النسبة الصنهاجية للمؤلف اسم جده الثالث&quot;يلين&quot; الذي ينطق به في اللهجة الصنهاجية تماما كما ضبطه ابن فرحون يياء مثناة من تحت مفتوحة ولام مشددة مكسورة، وياء ساكنة مثناة من تحت نون ساكنة. لا يعرف تاريخ ولادته باتفاق أصحاب كتب التراجم، كما لا يعرف تاريخ انتقاله إلى مصر منفردا أو مع أبيه.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people";
          },
        },{id: "post-01-الحرف-المائية",
      
        title: "01 الحرف المائية",
      
      description: "دراسة ميدانية للحرف المائية وسيط",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/tarik/";
        
      },
    },{id: "post-قراءة-في-المنهج-الخلدوني",
      
        title: "قراءة في المنهج الخلدوني",
      
      description: "دراسة تحليلية نقدية للمنهج الخلدوني، وسيط",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/water-based-crafts/";
        
      },
    },{id: "post-دور-الماء-في-العمران-والحضارة-من-خلال-كتاب-نزهة-المشتاق-للإدريسي",
      
        title: "دور الماء في العمران والحضارة من خلال كتاب نزهة المشتاق للإدريسي",
      
      description: "دراسة لأهمية الموارد المائية في تشييد المدن وتطور العمران من خلال المصادر الوسيطة",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/nozha/";
        
      },
    },{id: "post-الحرف-المائية-الذباغون-في-مدينة-مراكش",
      
        title: "الحرف المائية الذباغون في مدينة مراكش",
      
      description: "دراسة للحرف المائية بالمدن المغربية ط",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/dbgha/";
        
      },
    },{id: "post-الدولة-الأموية",
      
        title: "الدولة الأموية",
      
      description: "دراسة لانتشار الإسلام إبان المرحلة الأموية ط",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/amouia/";
        
      },
    },{id: "post-التصوف-والطرق-الدينية-بالمغرب",
      
        title: "التصوف والطرق الدينية بالمغرب",
      
      description: "دراسة للتصوف والطرق",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/manhaje/";
        
      },
    },{id: "post-ردود-فعل-ساكنة-إحاحان-على-الأزمات-المناخية",
      
        title: "ردود فعل ساكنة إحاحان على الأزمات المناخية",
      
      description: "دراسة لأثر التقلبات المناخية على الساكنة المغربية",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/haha/";
        
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
