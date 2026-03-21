---
layout: post
title: "الحرف المائية في المغرب الوسيط: تقنيات وممارسات وتنظيمات"
date: 2025-02-19
description: "دراسة توثيقية للحرف التقليدية المرتبطة بالماء في المغرب الوسيط، واستكشاف تأثيرها في التنمية الاقتصادية والاجتماعية للمجتمعات المحلية، مع تحليل لأنظمة تنظيمها وطرق انتقال المعرفة المرتبطة بها عبر الأجيال"
tags: [الدباغة، الحرف-المائية، الصناعات-التقليدية، المغرب-الوسيط، مراكش، تاريخ-الحرف، تقنيات-تقليدية، اقتصاد-الحرف، تنظيم-مهني، صحة-مهنية، الماء-والحرف]
categories: [التاريخ-الاقتصادي، الحرف-التقليدية]
thumbnail: /dist/images/articles/water-crafts-morocco.jpg
featured: false
reading_time: 10
comments: water-crafts-morocco-comments
---

<!-- Additional libraries for interactive charts and animations -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>

<!-- Interactive Data Visualization and Animation Scripts -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize water animation canvas
    initWaterCanvas();
    
    // Initialize the leather tanning process timeline (moved to Stimulus controller)
    // initTanningTimeline();
    
    // Set up economic data charts
    initEconomicCharts();

    // Initialize comparison slider
    initComparisonSlider();
    
    // Initialize export charts and distribution
    initExportCharts();
    
  });
  
  // 1. Interactive Water Canvas Animation
  function initWaterCanvas() {
    const canvas = document.getElementById('waterCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
      const canvasContainer = canvas.parentElement;
      canvas.width = canvasContainer.offsetWidth;
      canvas.height = 260; // Fixed height for consistency
    }
    
    // Initialize water properties
    let time = 0;
    const waves = [];
    const numWaves = 15;
    const ripples = [];
    let animationFrameId;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Create wave data
    for (let i = 0; i < numWaves; i++) {
      waves.push({
        frequency: 0.01 + Math.random() * 0.02,
        amplitude: 2 + Math.random() * 8,
        speed: 0.02 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2
      });
    }
    
    // Handle mouse/touch interaction to create ripples
    function createRipple(x, y) {
      ripples.push({
        x: x,
        y: y,
        radius: 0,
        maxRadius: 50 + Math.random() * 100,
        opacity: 1,
        speed: 1 + Math.random() * 2
      });
    }
    
    canvas.addEventListener('mousemove', function(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only create ripples occasionally for smoother performance
      if (Math.random() > 0.7) {
        createRipple(x, y);
      }
    });
    
    canvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      if (Math.random() > 0.7) {
        createRipple(x, y);
      }
    });
    
    canvas.addEventListener('click', function(e) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create multiple ripples on click for effect
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          createRipple(x + (Math.random() * 40 - 20), y + (Math.random() * 40 - 20));
        }, i * 100);
      }
    });
    
    // Animation function
    function animate() {
      // Update time
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient (sandy-amber colors for Moroccan theme)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(146, 64, 14, 0.8)'); // amber-800
      gradient.addColorStop(0.5, 'rgba(180, 83, 9, 0.7)'); // amber-700
      gradient.addColorStop(1, 'rgba(217, 119, 6, 0.6)'); // amber-600
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw water surface
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.3);
      
      // Draw complex wave pattern
      for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height * 0.3; // baseline
        
        // Add all wave components
        waves.forEach(wave => {
          y += Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude;
        });
        
        ctx.lineTo(x, y);
      }
      
      // Complete water shape
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      
      // Fill water with gradient
      const waterGradient = ctx.createLinearGradient(0, canvas.height * 0.3, 0, canvas.height);
      waterGradient.addColorStop(0, 'rgba(220, 183, 80, 0.7)'); // light amber
      waterGradient.addColorStop(0.5, 'rgba(217, 119, 6, 0.5)');
      waterGradient.addColorStop(1, 'rgba(146, 64, 14, 0.4)');
      ctx.fillStyle = waterGradient;
      ctx.fill();
      
      // Draw ripples
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      
      // Update and draw each ripple
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        
        // Update ripple
        ripple.radius += ripple.speed;
        ripple.opacity -= 0.01;
        
        // Draw ripple if still visible
        if (ripple.opacity > 0 && ripple.radius < ripple.maxRadius) {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx.globalAlpha = ripple.opacity;
          ctx.stroke();
          ctx.globalAlpha = 1;
        } else {
          // Remove invisible ripples
          ripples.splice(i, 1);
        }
      }
      
      // Draw some floating particles to represent materials in the water
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(time * 0.1 + i) + 1) * canvas.width / 2;
        const y = canvas.height * 0.3 + Math.sin(time * 0.2 + i * 0.3) * 10 + (i % 20);
        const size = 1 + Math.sin(time + i) * 1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Initialize canvas and start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function handleVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!prefersReducedMotion) {
          animate();
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);

    if (!prefersReducedMotion) {
      animate();
    }
    
    // Clean up animation when leaving page
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }
  
  // 2. Initialize Tanning Process Timeline
  function initTanningTimeline() {
    // Disabled: replaced by Stimulus controller
    return;
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineProgress = document.querySelector('.timeline-progress');
    const animateButton = document.getElementById('animateTimelineBtn');
    
    if (!timelineTrack || !timelineProgress || !animateButton) return;
    
    // Timeline data - each step of the process
    const timelineSteps = [
      {
        title: "استلام الجلود",
        icon: "truck",
        description: "استلام الجلود النيئة من المذابح وتصنيفها حسب النوع والحجم والجودة",
        duration: "يوم واحد"
      },
      {
        title: "النقع (أفزاك)",
        icon: "water",
        description: "غمر الجلود في ماء نقي لإزالة الأوساخ والدم والملح لمدة 2-4 أيام",
        duration: "2-4 أيام"
      },
      {
        title: "الماء والجير",
        icon: "flask",
        description: "نقع الجلود في محلول الماء والجير لإزالة الشعر والصوف",
        duration: "3-5 أيام"
      },
      {
        title: "إزالة الشعر",
        icon: "cut",
        description: "كشط الشعر والصوف من الجلود بعد مرحلة الجير (أقلاع)",
        duration: "يوم واحد"
      },
      {
        title: "درق الحمام",
        icon: "feather",
        description: "نقع الجلود في محلول درق الحمام لإزالة بقايا الجير وتليين الجلد",
        duration: "2-3 أيام"
      },
      {
        title: "الماء والنخالة",
        icon: "seedling",
        description: "نقع الجلود في محلول الماء والنخالة (التخمار) لمنح الجلد ليونة وصفاء",
        duration: "7 أيام"
      },
      {
        title: "الدباغ",
        icon: "vial",
        description: "نقع الجلود في محلول الميموزة والمواد الدابغة لتثبيت ألياف الجلد",
        duration: "3 أيام"
      },
      {
        title: "التشميس",
        icon: "sun",
        description: "تجفيف الجلود في الشمس لإزالة الرطوبة الزائدة",
        duration: "1-3 أيام"
      },
      {
        title: "التكراط (البشير)",
        icon: "tools",
        description: "تنعيم سطح الجلد وإزالة أي شوائب متبقية باستخدام أدوات خاصة",
        duration: "1-2 أيام"
      },
      {
        title: "التلوين",
        icon: "palette",
        description: "صبغ الجلود بالألوان المطلوبة باستخدام صبغات طبيعية أو كيميائية",
        duration: "1-2 أيام"
      },
      {
        title: "التشطيب",
        icon: "check-circle",
        description: "المعالجة النهائية للجلود وتجهيزها للبيع والاستخدام",
        duration: "1 يوم"
      }
    ];
    
    // Create timeline steps
    timelineSteps.forEach((step, index) => {
      const stepElement = document.createElement('div');
      stepElement.className = 'timeline-step flex flex-col items-center relative';
      stepElement.setAttribute('data-step', index);
      
      // Step content with icon
      stepElement.innerHTML = `
        <div class="step-icon bg-amber-100 text-amber-800 w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300">
          <i class="fas fa-${step.icon} text-xl"></i>
        </div>
        <div class="step-dot absolute top-[72px] right-[32px] w-4 h-4 bg-amber-800 rounded-full"></div>
        <div class="step-content w-48 text-center mt-2 opacity-60 transition-all duration-300">
          <h4 class="font-bold text-amber-900 mb-1">${step.title}</h4>
          <p class="text-stone-700 text-xs line-clamp-2">${step.description}</p>
          <span class="text-amber-700 text-xs font-medium">
            <i class="fas fa-clock text-xs ml-1"></i>${step.duration}
          </span>
        </div>
      `;
      
      timelineTrack.appendChild(stepElement);
    });
    
    // Function to animate timeline
    let animationInProgress = false;
    let currentStep = -1;
    
    function animateTimeline() {
      if (animationInProgress) return;
      
      // Reset timeline
      document.querySelectorAll('.timeline-step').forEach(step => {
        step.querySelector('.step-icon').classList.remove('bg-amber-500', 'text-white');
        step.querySelector('.step-icon').classList.add('bg-amber-100', 'text-amber-800');
        step.querySelector('.step-content').classList.add('opacity-60');
        step.querySelector('.step-content').classList.remove('opacity-100');
      });
      
      timelineProgress.style.width = '0%';
      currentStep = -1;
      animationInProgress = true;
      
      // Update button text
      animateButton.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i>جاري عرض المراحل';
      
      // Animate through each step
      function advanceStep() {
        currentStep++;
        
        if (currentStep >= timelineSteps.length) {
          // Animation complete
          animationInProgress = false;
          animateButton.innerHTML = '<i class="fas fa-redo ml-2"></i>إعادة عرض المراحل';
          return;
        }
        
        // Update progress bar
        const progressWidth = (currentStep / (timelineSteps.length - 1)) * 100;
        gsap.to(timelineProgress, {
          width: `${progressWidth}%`,
          duration: 0.5,
          ease: 'power2.out'
        });
        
        // Update current step styling
        const stepElement = document.querySelector(`.timeline-step[data-step="${currentStep}"]`);
        
        // Highlight current step
        gsap.to(stepElement.querySelector('.step-icon'), {
          backgroundColor: '#f59e0b', // amber-500
          color: '#fff',
          scale: 1.1,
          duration: 0.3
        });
        
        gsap.to(stepElement.querySelector('.step-content'), {
          opacity: 1,
          y: -5,
          duration: 0.3
        });
        
        // Auto-scroll to keep current step in view
        if (currentStep > 2) {
          const scrollOffset = (currentStep - 2) * 100; // Approximate width to scroll
          gsap.to(timelineTrack.parentElement, {
            scrollRight: scrollOffset,
            duration: 0.5
          });
        }
        
        // Wait before advancing to next step
        setTimeout(advanceStep, 1500);
      }
      
      // Start animation
      advanceStep();
    }
    
    // Initialize timeline animation
    animateButton.addEventListener('click', animateTimeline);
    
    // Allow horizontal scrolling on the timeline with mouse drag
    let isDragging = false;
    let startScrollPosition = 0;
    let startMousePosition = 0;
    
    timelineTrack.parentElement.addEventListener('mousedown', function(e) {
      isDragging = true;
      startScrollPosition = this.scrollLeft;
      startMousePosition = e.pageX;
      this.style.cursor = 'grabbing';
    });
    
    window.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      
      const timeline = document.querySelector('.tanning-process-timeline');
      if (!timeline) return;
      
      const dx = e.pageX - startMousePosition;
      timeline.scrollLeft = startScrollPosition - dx;
    });
    
    window.addEventListener('mouseup', function() {
      isDragging = false;
      const timeline = document.querySelector('.tanning-process-timeline');
      if (timeline) {
        timeline.style.cursor = 'grab';
      }
    });
  }
  
  // 3. Initialize economic data charts
  function initEconomicCharts() {
    // Add chart.js economic visualization after the profits table
    const tableElement = document.querySelector('.not-prose table');
    if (!tableElement) return;
    
    // Create canvas for the chart
    const chartContainer = document.createElement('div');
    chartContainer.className = 'mt-10';
    chartContainer.innerHTML = `
      <h4 class="font-bold text-amber-800 mb-4 text-lg">التحليل الاقتصادي لحرفة الدباغة</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <canvas id="profitMarginChart" height="250"></canvas>
          </div>
        </div>
        <div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <canvas id="processingTimeChart" height="250"></canvas>
          </div>
        </div>
      </div>
    `;
    
    // Insert after the table
    tableElement.parentNode.insertBefore(chartContainer, tableElement.nextSibling);
    
    // Create profit margin chart
    const leatherTypes = ['جلد الغنم', 'جلد الماعز', 'جلد البقر', 'جلد الإبل'];
    const avgPurchasePrices = [85, 75, 400, 500];
    const avgSellingPrices = [175, 155, 700, 900];
    const materialCosts = [17.5, 17.5, 90, 110];
    
    // Calculate profit margins
    const profitMargins = leatherTypes.map((_, i) => {
      return (avgSellingPrices[i] - avgPurchasePrices[i] - materialCosts[i]);
    });
    
    const profitPercentages = leatherTypes.map((_, i) => {
      return (profitMargins[i] / avgPurchasePrices[i] * 100).toFixed(1);
    });
    
    // Profit margin chart
    const profitCtx = document.getElementById('profitMarginChart');
    if (profitCtx) {
      new Chart(profitCtx, {
        type: 'bar',
        data: {
          labels: leatherTypes,
          datasets: [
            {
              label: 'تكلفة الشراء (درهم)',
              data: avgPurchasePrices,
              backgroundColor: 'rgba(194, 65, 12, 0.6)', // amber-800
              stack: 'Stack 0'
            },
            {
              label: 'تكلفة المواد (درهم)',
              data: materialCosts,
              backgroundColor: 'rgba(234, 88, 12, 0.6)', // amber-600
              stack: 'Stack 0'
            },
            {
              label: 'الربح (درهم)',
              data: profitMargins,
              backgroundColor: 'rgba(245, 158, 11, 0.6)', // amber-500
              stack: 'Stack 0'
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'تحليل الربح حسب نوع الجلد',
              font: {
                size: 16
              }
            },
            tooltip: {
              mode: 'index',
              callbacks: {
                afterTitle: function(context) {
                  const index = context[0].dataIndex;
                  return `نسبة الربح: ${profitPercentages[index]}%`;
                }
              }
            }
          },
          responsive: true,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: 'القيمة بالدرهم'
              }
            }
          }
        }
      });
    }
    
    // Processing time chart
    const processingTimes = [8.5, 8.5, 13.5, 17.5]; // Average days
    const processingCtx = document.getElementById('processingTimeChart');
    if (processingCtx) {
      new Chart(processingCtx, {
        type: 'radar',
        data: {
          labels: ['وقت المعالجة (أيام)', 'تكلفة المواد (×10 درهم)', 'الربح (×10 درهم)', 'نسبة الربح (%)', 'سعر البيع (×100 درهم)'],
          datasets: [
            {
              label: 'جلد الغنم',
              data: [8.5, 1.75, 7, 76.5, 1.75],
              borderColor: 'rgba(146, 64, 14, 0.7)',
              backgroundColor: 'rgba(146, 64, 14, 0.2)'
            },
            {
              label: 'جلد الماعز',
              data: [8.5, 1.75, 6, 80, 1.55],
              borderColor: 'rgba(180, 83, 9, 0.7)',
              backgroundColor: 'rgba(180, 83, 9, 0.2)'
            },
            {
              label: 'جلد البقر',
              data: [13.5, 9, 21, 52.5, 7],
              borderColor: 'rgba(217, 119, 6, 0.7)',
              backgroundColor: 'rgba(217, 119, 6, 0.2)'
            },
            {
              label: 'جلد الإبل',
              data: [17.5, 11, 29, 58, 9],
              borderColor: 'rgba(245, 158, 11, 0.7)',
              backgroundColor: 'rgba(245, 158, 11, 0.2)'
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'مقارنة عوامل الإنتاج حسب نوع الجلد',
              font: {
                size: 16
              }
            }
          },
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0
            }
          }
        }
      });
    }
  }
  
  // 5. Initialize comparison slider
  function initComparisonSlider() {
    const slider = document.getElementById('comparison-slider');
    const foregroundImage = document.getElementById('foreground-image');
    const sliderControl = document.getElementById('slider-control');
    const playPauseButton = document.getElementById('playPauseButton');
    
    if (!slider || !foregroundImage || !sliderControl || !playPauseButton) return;
    
    let isDragging = false;
    let animationFrameId;
    let isPlaying = false;
    
    function updateSliderPosition(x) {
      const rect = slider.getBoundingClientRect();
      const offsetX = x - rect.left;
      const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
      foregroundImage.style.width = `${percentage}%`;
      sliderControl.style.right = `${percentage}%`;
    }
    
    slider.addEventListener('mousedown', function(e) {
      isDragging = true;
      updateSliderPosition(e.clientX);
    });
    
    window.addEventListener('mousemove', function(e) {
      if (isDragging) {
        updateSliderPosition(e.clientX);
      }
    });
    
    window.addEventListener('mouseup', function() {
      isDragging = false;
    });
    
    slider.addEventListener('touchstart', function(e) {
      isDragging = true;
      updateSliderPosition(e.touches[0].clientX);
    });
    
    window.addEventListener('touchmove', function(e) {
      if (isDragging) {
        updateSliderPosition(e.touches[0].clientX);
      }
    });
    
    window.addEventListener('touchend', function() {
      isDragging = false;
    });
    
    function animateSlider() {
      let direction = 1;
      let percentage = parseFloat(foregroundImage.style.width) || 50;
      
      function step() {
        percentage += direction * 0.5;
        if (percentage >= 100 || percentage <= 0) {
          direction *= -1;
        }
        foregroundImage.style.width = `${percentage}%`;
        sliderControl.style.right = `${percentage}%`;
        animationFrameId = requestAnimationFrame(step);
      }
      
      step();
    }
    
    playPauseButton.addEventListener('click', function() {
      if (isPlaying) {
        cancelAnimationFrame(animationFrameId);
        playPauseButton.innerHTML = '<i class="fas fa-play ml-1"></i><span>تحريك المقارنة</span>';
      } else {
        animateSlider();
        playPauseButton.innerHTML = '<i class="fas fa-pause ml-1"></i><span>إيقاف التحريك</span>';
      }
      isPlaying = !isPlaying;
    });
  }
  
  // 6. Initialize charts for economic data
  function initExportCharts() {
    // Export growth chart
    const exportCtx = document.getElementById('exportGrowthChart');
    if (exportCtx) {
      new Chart(exportCtx, {
        type: 'line',
        data: {
          labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
          datasets: [
            {
              label: 'الصادرات المغربية من الجلود (مليون درهم)',
              data: [425, 487, 560, 645, 710, 790],
              borderColor: 'rgba(146, 64, 14, 1)',
              backgroundColor: 'rgba(146, 64, 14, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4
            },
            {
              label: 'منتجات الحرف المائية التقليدية (مليون درهم)',
              data: [180, 210, 260, 320, 380, 450],
              borderColor: 'rgba(217, 119, 6, 1)',
              backgroundColor: 'rgba(217, 119, 6, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'نمو الصادرات في قطاع الجلود والحرف المائية',
              font: { size: 14 }
            },
            tooltip: {
              mode: 'index',
              callbacks: {
                afterLabel: function(context) {
                  const dataset = context.dataset;
                  const currentValue = dataset.data[context.dataIndex];
                  const previousValue = dataset.data[context.dataIndex - 1];
                  
                  if (context.dataIndex > 0) {
                    const percentChange = ((currentValue - previousValue) / previousValue * 100).toFixed(1);
                    return `نسبة النمو: ${percentChange}%`;
                  }
                  return '';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'القيمة بالمليون درهم'
              }
            }
          }
        }
      });
    }
  
    // Water crafts distribution chart
    const distributionCtx = document.getElementById('waterCraftsDistributionChart');
    if (distributionCtx) {
      new Chart(distributionCtx, {
        type: 'pie',
        data: {
          labels: ['الدباغة التقليدية', 'صناعة الفخار المائي', 'السقاية والإرواء', 'الصباغة', 'نول الماء', 'حرف مائية أخرى'],
          datasets: [{
            data: [42, 18, 14, 12, 9, 5],
            backgroundColor: [
              'rgba(146, 64, 14, 0.8)',  // amber-800
              'rgba(180, 83, 9, 0.8)',   // amber-700
              'rgba(217, 119, 6, 0.8)',  // amber-600
              'rgba(245, 158, 11, 0.8)', // amber-500
              'rgba(251, 191, 36, 0.8)', // amber-400
              'rgba(252, 211, 77, 0.8)'  // amber-300
            ],
            borderColor: [
              'rgb(255, 255, 255)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'توزيع الحرف المائية في المغرب (2025)',
              font: { size: 14 }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  return `${label}: ${value}%`;
                }
              }
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }
  
</script>

<div class="prose prose-lg mx-auto">
    <div class="not-prose bg-amber-50 rounded-lg p-4 sm:p-6 border-r-4 border-amber-500 mb-8">
      <div class="flex items-start">
        <div class="flex-shrink-0 ml-4">
          <svg class="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-medium text-amber-800">حول هذه الدراسة</h2>
          <p class="mt-1 text-stone-700">
            تقدم هذه الدراسة رصداً توثيقياً للحرف التقليدية المرتبطة بالماء في المغرب الوسيط، مع التركيز على حرفة دباغة الجلود. تستكشف الدراسة مراحل دباغة الجلد المختلفة، وأدوات العمل، والجوانب الاقتصادية، بالإضافة إلى الآثار الصحية المترتبة على ممارسة هذه الحرفة. تعتمد الدراسة على مزيج من البحث الميداني والمقابلات الشفوية مع الحرفيين العاملين في دار الدباغة الكبيرة بمراكش.
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center mb-8">
      <div class="text-center max-w-2xl">
        <p class="text-gray-600 mb-4">سلك الماستر: الماء في تاريخ المملكة المغربية</p>
        <p class="text-gray-600 mb-4">كلية الآداب والعلوم الإنسانية، جامعة القاضي عياض - مراكش</p>
        <p class="text-gray-600 mb-4">وحدة: الحرف المائية</p>
        <p class="text-gray-600">تحت إشراف الدكتور: توفيق محمد لقبايبي</p>
      </div>
    </div>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    سنحاول في هذا المحور تقديم نظرة عامة حول المراحل التي يمر منها الجلد، من كونه مادة خام إلى أن يصل إلى المستهلك في حلته النهائية؛ وما يهمنا في هذه النقطة هو طريقة عمل الحرفيين في كل مرحلة على حدة، منفتحين على الأدوات التي يشتغلون بها، والأضرار التي يمكن أن يتعرض لها "المعلمون"، وكذا المقابل المادي لهؤلاء الحرفيين.
    </p>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    نعتمد في هذه الدراسة على الزيارة الميدانية التي قمنا بها إلى دار "الدباغة الكبيرة" بمراكش، ومن خلال مجموعة من المقابلات الشفوية التي أجريناها مع الحرفيين، كل حسب نوعية الجلد الذي يقوم بدباغته. واضعين نصب أعيننا مجموعة من التساؤلات وددنا الإجابة عنها من قبيل: كيف تتم دباغة الجلود وما هي مراحل دباغتها؟ وكيف يشتغل الحرفيون وبماذا يشتغلون؟ وما هو الأجر المادي الذي يتقاضاه "المعلم" عن كل "طرحة"؟ وهل حصل تغير في المواد المستعملة في الدباغة بين الأمس والحاضر؟
    </p>

    <!-- Interactive 3D Water Animation Canvas -->
    <div class="not-prose rounded-lg overflow-hidden my-8 relative">
      <canvas id="waterCanvas" class="w-full h-64 rounded-lg"></canvas>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="text-white text-center px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg max-w-md">
          <h3 class="text-xl font-bold mb-2">دور الماء في حرفة الدباغة</h3>
          <p>الماء عنصر أساسي في جميع مراحل دباغة الجلود التقليدية. انقر أو مرر على الصورة للتفاعل مع الماء</p>
        </div>
      </div>
    </div>

    <div class="not-prose rounded-lg overflow-hidden my-8">
      <div class="relative">
        <img src="/dist/images/articles/tannery-marrakech.jpg" alt="دار الدباغة الكبيرة بمراكش" class="w-full h-auto object-cover rounded-lg" loading="lazy" decoding="async">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-lg"></div>
        <div class="absolute bottom-0 right-0 p-4 text-white">
          <p class="text-sm">منظر عام لدار الدباغة الكبيرة بمراكش - موقع الدراسة الميدانية</p>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">1- مراحل دباغة الجلد</h2>

    <!-- Interactive Timeline (Stimulus + Tailwind) -->
    <div class="not-prose bg-white rounded-xl shadow-sm p-6 my-8 border border-stone-200" data-controller="tanning-timeline" dir="rtl">
      <h3 class="text-xl font-bold text-amber-900 mb-4">مراحل دباغة الجلود - العملية كاملة</h3>

      <!-- Info Row -->
      <div class="mb-2 text-sm text-stone-600 flex justify-between">
        <span data-tanning-timeline-target="status" role="status" aria-live="polite">الخطوة 1 من 11</span>
      </div>
      <!-- Progress Bar -->
      <div class="mb-4">
        <div class="h-1.5 w-full bg-amber-100 rounded-full overflow-hidden">
          <div class="h-full bg-amber-600 w-0 transition-all duration-300" data-tanning-timeline-target="progress"></div>
        </div>
      </div>

      <!-- Scrollable Timeline Container with Mobile Indicators -->
      <div class="relative" data-tanning-timeline-target="timelineWrapper">
        <!-- Scroll hints -->
        <div class="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 rounded-full p-2 animate-pulse md:hidden" data-tanning-timeline-target="leftHint">
          <i class="fas fa-chevron-left text-white text-xs"></i>
        </div>
        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/20 rounded-full p-2 animate-pulse md:hidden" data-tanning-timeline-target="rightHint">
          <i class="fas fa-chevron-right text-white text-xs"></i>
        </div>
        
        <div id="timelineTrack" class="overflow-x-auto cursor-grab select-none scrollbar-hide pb-4" data-tanning-timeline-target="trackContainer" tabindex="0" aria-label="المسار الزمني لمراحل الدباغة">
          <!-- Mobile progress indicator -->
          <div class="h-1 bg-amber-200 rounded-full mb-4 md:hidden">
            <div class="h-full bg-amber-600 rounded-full transition-all duration-300" data-tanning-timeline-target="mobileProgress"></div>
          </div>
          
          <div class="flex items-stretch gap-4 min-w-max" data-tanning-timeline-target="track" role="list">
            <!-- Steps will be injected by Stimulus controller -->
          </div>
        </div>
        
        <!-- Mobile swipe instruction -->
        <p class="text-center text-sm text-stone-500 mt-2 md:hidden">
          <i class="fas fa-hand-paper ml-1"></i>
          اسحب أفقياً لتصفح الخطوات
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="text-center mt-6">
        <div class="inline-flex items-center gap-2">
          <button class="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-colors" data-action="click->tanning-timeline#autoPlay" data-tanning-timeline-target="animateButton" aria-controls="timelineTrack">
            <i class="fas fa-play ml-1"></i>
            <span>عرض مراحل الدباغة</span>
          </button>
          <button class="hidden inline-flex items-center gap-2 bg-stone-200 hover:bg-stone-300 text-stone-800 px-4 py-2.5 rounded-lg shadow-sm transition-colors" data-action="click->tanning-timeline#togglePause" data-tanning-timeline-target="pauseButton" aria-controls="timelineTrack">
            <i class="fas fa-pause ml-1"></i>
            <span>إيقاف مؤقت</span>
          </button>
          <button class="hidden inline-flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2.5 rounded-lg shadow-sm transition-colors" data-action="click->tanning-timeline#restart" data-tanning-timeline-target="restartButton">
            <i class="fas fa-redo ml-1"></i>
            <span>إعادة من البداية</span>
          </button>
        </div>
      </div>
    </div>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    يتم تجميع الجلود بمختلف أنواعها بالمذابح الموجودة داخل الأسواق الأسبوعية الموزعة في المناطق المغربية، وخاصة منها المعروفة بتربية المواشي وبالرعي كسوس وحاحا وطانطان والداخلة وكذا مناطق الجنوب الشرقي، لتصل في مرحلة من المراحل إلى دار الدباغة لمباشرة العمل، وفي غالب الأحيان ما تتم هذه العملية تحت مراقبة المعلم، حيث يباشر مهامه عبر مجموعة من المراحل.
    </p>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    سنركز في العرض على صنفين من الجلود المدبوغة: (جلود الغنم والماعز) من جهة، و(جلود البقر والإبل) من جهة أخرى.
    </p>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">مرحلة الترقاد في الماء أو "أفزاك"</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <p class="text-stone-700 mb-4">
            يتم وضع الجلود داخل حفرة ذات شكل دائري تسمى "القصرية" يصل فيها الماء إلى حدود ركبة الدباغ، ويمكث فيها الجلد مدة تختلف حسب طبيعة الجلد، فإذا كان هذا الأخير طريا فآنذاك يتطلب الأمر يومين وإذا كان الجلد عكس ذلك (يابسا) فإن الأمر يحتاج إلى أربعة أيام أو أكثر.
          </p>

          <p class="text-stone-700 mb-4">
            تهدف هذه العملية إلى ترطيب الجلود وإزالة بقايا الملح التي تم وضعها في الجلد بعد الذبح (في المذبح) للحفاظ على طراوتها ومنعها من التعفن خلال مدة نقل الجلود من الأسواق إلى دار الدباغة.
          </p>

          <p class="text-stone-700">
            بعد أن يتم وضع الجلود في الماء لمدة معينة، وقبل المرور إلى المرحلة الثانية يقوم المعلم بغسل الجلود (التشلال) في صهريج خاص بذلك لتصفيته من بقايا الملح لأنها تفقد للجير قوته، لكي يكون جاهزا للمرحلة القادمة.
          </p>
        </div>

        <div>
          <div class="bg-amber-50 p-5 rounded-lg border border-amber-100 h-full">
            <h4 class="font-bold text-amber-800 mb-3 pb-2 border-b border-amber-100">المصطلحات الرئيسية</h4>
            <ul class="space-y-3 text-stone-700">
              <li class="flex items-start">
                <span class="inline-block ml-2 text-amber-600">•</span>
                <div>
                  <span class="font-bold text-amber-800">أفزاك:</span> مصطلح أمازيغي يشير إلى عملية نقع الجلود في الماء
                </div>
              </li>
              <li class="flex items-start">
                <span class="inline-block ml-2 text-amber-600">•</span>
                <div>
                  <span class="font-bold text-amber-800">القصرية:</span> حفرة دائرية مخصصة لنقع الجلود
                </div>
              </li>
              <li class="flex items-start">
                <span class="inline-block ml-2 text-amber-600">•</span>
                <div>
                  <span class="font-bold text-amber-800">التشلال:</span> عملية غسل الجلود لتصفيتها من بقايا الملح
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">مرحلة الماء والجير</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div class="rounded-lg overflow-hidden mb-4">
            <img src="/dist/images/articles/lime-water-tanning.jpg" alt="مرحلة الماء والجير في دباغة الجلود" class="w-full h-auto" loading="lazy" decoding="async">
          </div>

          <p class="text-stone-700">
            في هذه المرحلة يتم خلط الماء بالجير ومادة السلفور لإزالة الشعر والشوائب العالقة بالجلد
          </p>
        </div>

        <div>
          <p class="text-stone-700 mb-4">
            في هذه المرحلة يوضع الجلد في الصهريج الخاص بالماء والجير، ويتم مزجه بمادة كيماوية تسمى "السّلفور Sulfur" والتي تساعد على إزالة الشعر وبقايا الشوائب التي تلتصق بالجلد. وبعد مرور عدة أيام على وضع الجلود في المجيار يتم إخراجها وتركها في مكان يدعى (بأمرواح) مدة تختلف حسب الفصول وحسب شدة البرودة أو الحرارة.
          </p>

          <p class="text-stone-700">
            ويعمد الحرفي في هذه المرحلة إلى فصل الصوف عن الجلود باستعمال اليد فقط (أقلاع) والتحريك بطريقة مستمرة في الماء الممزوج بالجير، حتى تصل إلى الشبع التي يسميها الحرفيين "شربات الجلدة"، ليتم بعد ذلك غسله في الصهريج الخاص "بالتشلال"، للمرور إلى المرحلة المقبلة.
          </p>
        </div>
      </div>
    </div>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">مرحلة الماء الممزوج بدرق الحمام</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <p class="text-stone-700 mb-4">
            تعتبر من أهم المراحل، حيث يلعب درق الحمام دورا فعالا في تليين الجلد، ويقوم بإزالة بقايا الجير ويقتل مفعوله. فهي محطة لابد منها للحرفين إذ تأتي لاستكمال ما بدأه الجير في المرحلة السالفة، وفي نفس الوقت تهدف إلى تجهيز الجلد للمرحلة الموالية حيث تعرف جاهيزيتها ب"طاحت الجلد".
          </p>
        </div>

        <div>
          <div class="bg-amber-50 p-5 rounded-lg border border-amber-100 h-full">
            <h4 class="font-bold text-amber-800 mb-3 pb-2 border-b border-amber-100">فوائد درق الحمام</h4>
            <ul class="space-y-2 text-stone-700 list-disc mr-6">
              <li>تليين الجلد بشكل طبيعي</li>
              <li>إزالة بقايا الجير من الجلد</li>
              <li>تحضير الجلد للمرحلة التالية</li>
              <li>مادة طبيعية تحل محل المواد الكيماوية</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">مرحلة الماء والرّدة أي "النخالة"</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p class="text-stone-700 mb-4">
            في هذه المرحلة يتم وضع الجلود في القصرية المملوءة بالماء وخليط الرّدة "النخالة"، وتسمى بمرحلة "التّخمار"، إذ يتم في بعض الأحيان استعمال مواد مخمرة لتسهيل العملية.
          </p>

          <p class="text-stone-700">
            تعد هذه المرحلة من أطول المراحل إذ تستغرق حوالي أسبوع على الأقل، وتهدف هذه المرحلة أساسا منح الجلد ليونة وصفاء.
          </p>
        </div>

        <div>
          <div class="rounded-lg overflow-hidden mb-4">
            <img src="/dist/images/articles/bran-water-tanning.jpg" alt="مرحلة الماء والنخالة في دباغة الجلود" class="w-full h-auto" loading="lazy" decoding="async">
          </div>

          <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <p class="text-stone-700 text-sm italic">
              "تخمار الجلد بالنخالة يعطيه ليونة لا تعطيها المواد الكيميائية، وهو سر من أسرار الحرفة توارثناه عن أجدادنا. لكن هذه المرحلة تتطلب صبرا وخبرة كبيرة لمعرفة متى يصبح الجلد جاهزا للمرحلة التالية."
            </p>
            <p class="text-stone-600 text-sm text-left mt-1">- الحاج محمد، معلم دباغ، 67 سنة</p>
          </div>
        </div>
      </div>
    </div>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">مرحلة الدباغ</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <p class="text-stone-700 mb-4">
            تعتبر مرحلة الدباغ آخر مرحلة في عملية غسل الجلود وتنقيتها، حيث تستعمل إلى جانب الماء مادة طبيعية تسمى "بالميموزة"، بالإضافة إلى مادة أخرى كيماوية تسمى "كاسطرا castra"، تساهم هاتين المادتين في إعطاء الجلود حلتها النهائية لهذا سميت بمرحلة "الذبغ".
          </p>

          <p class="text-stone-700">
            تستغرق هذه العملية 3 أيام ليتم بعد ذلك إخراج الجلود وتترك في الشمس حتى تفقد الماء العالق بها، ليتم تقطيعها أو تقسيمها لتصبح جزء واحد، يستطيع معه الحرفي تكريطها بالصدرية.
          </p>
        </div>

        <div>
          <div class="bg-amber-50 p-5 rounded-lg border border-amber-100 h-full">
            <h4 class="font-bold text-amber-800 mb-3 pb-2 border-b border-amber-100">مواد الدباغة</h4>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0 ml-3 mt-0.5">
                  <div class="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 class="font-bold text-amber-800">الميموزة</h5>
                  <p class="text-stone-700 text-sm">مادة طبيعية مستخرجة من لحاء شجرة الميموزا، غنية بمادة التانين التي تثبت ألياف الجلد</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0 ml-3 mt-0.5">
                  <div class="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 class="font-bold text-amber-800">كاسطرا</h5>
                  <p class="text-stone-700 text-sm">مادة كيميائية تساعد على تثبيت اللون وحماية الجلد من التلف</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">مرحلة التكراط أو البشير</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div class="rounded-lg overflow-hidden mb-4">
            <img src="/dist/images/articles/leather-finishing.jpg" alt="مرحلة التكراط في دباغة الجلود" class="w-full h-auto">
          </div>

          <div class="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <h4 class="font-bold text-amber-800 mb-2">اختلاف الأدوات حسب الحرفيين</h4>
            <ul class="space-y-1 text-stone-700 text-sm list-disc mr-6">
              <li>الخطر - يستخدم لتنظيف سطح الجلد</li>
              <li>القوس - يستخدم لتمديد الجلد</li>
              <li>الموس - يستخدم لتقطيع وتشذيب الجلد</li>
            </ul>
          </div>
        </div>

        <div>
          <p class="text-stone-700 mb-4">
            تعتبر هذه المرحلة هي الفاصلة بين دباغة الجلد وتسويقه، فبعد أن يتم تشمسه لعدة أيام حسب الأحوال الجوية، يتوجه مباشرة الحرفي إلى مكان منعزل خاص بهذه المرحلة والتي تسمى بالبشير، حيث تحتوي على مجموعة من الأدوات كالخطر، والقوس أو الموس حسب كل معلم على حدى وحسب نوعية الجلود.
          </p>

          <p class="text-stone-700 mb-4">
            ويجب التمييز في هذه المرحلة بين الجلود الصغيرة والكبيرة، سواء من حيث الحرفيين المتخصصين في كل نوع، فالأمازيغ كانوا ينفردون بصناعة الجلود الكبيرة وخاصة البقر والإبل، وقد اشتهروا في مجموعة من المدن المغربية كتزنيت وأكادير وتارودانت، ويمتد هذا الاختلاف إلى أماكن الاشتغال أي "القصريات" التي تختلف أحجامها حسب الجلود.
          </p>

          <p class="text-stone-700">
            في حين أن الحرفيين العرب كانوا يحترفون صناعة الجلود الصغيرة "الماعز والغنم"، وعرفوا في مدن "كفاس وسلا..." ويزاولون هذا النشاط في قصريات صغيرة الحجم.
          </p>
        </div>
      </div>

      <div class="mt-6 p-5 bg-amber-50 rounded-lg border border-amber-100">
        <h4 class="font-bold text-amber-800 mb-3">الاختلاف في معالجة الجلود حسب حجمها</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 class="font-bold text-amber-700 mb-2">الجلود الكبيرة (البقر والإبل)</h5>
            <ul class="space-y-1 text-stone-700 text-sm list-disc mr-6">
              <li>تمر بمرحلة "التكراط" بالسكين لإزالة الطبقة العليا المتكونة من الشعر</li>
              <li>تحتاج إلى تشميس لعدة أيام</li>
              <li>تصل في النهاية إلى مرحلة البشير</li>
              <li>تتطلب قصريات كبيرة الحجم</li>
              <li>غالباً ما يتخصص فيها الحرفيون الأمازيغ</li>
            </ul>
          </div>

          <div>
            <h5 class="font-bold text-amber-700 mb-2">الجلود الصغيرة (الماعز والغنم)</h5>
            <ul class="space-y-1 text-stone-700 text-sm list-disc mr-6">
              <li>يكفي اقتلاع الشعر عنها باليد في مرحلة الماء والجير لسهولتها</li>
              <li>يمكن التحكم فيها بسهولة أكبر</li>
              <li>تحتاج إلى قصريات أصغر حجماً</li>
              <li>يتخصص فيها غالباً الحرفيون العرب</li>
              <li>كانت تشتهر بها مدن فاس وسلا</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="not-prose bg-amber-50 rounded-xl p-8 my-10 border border-amber-200 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-40 h-40 bg-amber-200/40 rounded-full -mt-20 -ml-20"></div>
      <div class="absolute bottom-0 right-0 w-40 h-40 bg-amber-200/40 rounded-full -mb-20 -mr-20"></div>

      <div class="relative z-10">
        <h3 class="text-2xl font-bold text-amber-900 mb-6">الجاعد أو "الهيضورة"</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2">
            <p class="text-stone-700 mb-4">
              لا يجب أن نغفل نوعا آخر من الجلود يتم استعماله بشكل كبير من طرف المغاربة، وخاصة البدو والرحل، وهو "الجاعد" أو ما نعرفه بمصطلح "الهيضورة"، وهو جلد من جلود الظأن، يدبغ ويبقى فيه شعره، ويجعله الراكب المسافر فوق الرحل يجلس عليه.
            </p>

            <p class="text-stone-700">
              يستعمله كذلك في الجلوس على الأرض في الصحراء، ويستفيد منه أغراضا أخرى منها، أنه يجعله بمثابة "الخوان" أي المائدة التي يوضع عليها الطعام من الثمر ونحوه، وذلك على الجهة التي ليس فيها شعر.
            </p>
          </div>

          <div>
            <div class="bg-white p-5 rounded-lg shadow-sm h-full">
              <div class="rounded-lg overflow-hidden mb-4">
                <img src="/dist/images/articles/jaad-leather.jpg" alt="جلد الجاعد أو الهيضورة" class="w-full h-auto">
              </div>

              <div class="text-center">
                <p class="text-stone-700 text-sm font-medium">جلد الجاعد (الهيضورة) المميز بالاحتفاظ بالشعر</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 bg-white p-5 rounded-lg shadow-sm">
          <p class="text-stone-700 italic">
            وقد انتبهنا أثناء جولتنا بموقع دار الدبغ إلى إشكال بعض المفاهيم والمصطلحات العامية التي تطلق على بعض مراحل الدبغ كأركال وأفازك... وطرحنا أسئلة كثيرة: ما هو المدى الذي بلغه المغربي أثناء عدم شعوره بالنطق بنبرة أمازيغية؟ وهل الدارجة العامية متأثرة في العمق بنظام مخارج الحروف الامازيغية؟ وهل هذه الكلمات خضعت لمقتضيات النظام الصوتي العربي أم المحلي أم هما معا؟ وهل نفس الطرح يسري على اللغة الفرنسية وغيرها؟
          </p>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">2- المقابل المادي لحرفة الدباغة</h2>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    يصعب على الباحث في ميدان الحرف التقليدية العتيقة الوقوف على الجانب المادي والاقتصادي بشكل دقيق، رغم أهميته الكبرى في تحديد ملامح الممارسة الحرفية بالمغرب، نظرا لمجموعة من الاعتبارات، من أهمها عدم توفر الحرفيين على دخل مستقر، واشتغالهم وفق العرض والطلب ومتطلبات السوق.
    </p>

    <div class="not-prose rounded-lg overflow-hidden my-8">
      <div class="relative">
        <img src="/dist/images/articles/tanner-economic-activity.jpg" alt="النشاط الاقتصادي للدباغين" class="w-full h-auto object-cover rounded-lg">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-lg"></div>
        <div class="absolute bottom-0 right-0 p-4 text-white">
          <p class="text-sm">دباغ يفاوض على بيع منتجاته في سوق الجلود التقليدي</p>
        </div>
      </div>
    </div>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    يجب أخذ عدة عوامل بعين الاعتبار، منها قوة المنافسة الأجنبية والسرعة في العمل بحكم استخدام الآلات المتطورة (المكننة)، بالإضافة إلى أن الظروف الجوية تتدخل في معظم الأحيان في تأخير العمل وإطالة مدة الدبغ. ثم تكتم أغلب الحرفيين وعدم تصريحهم بمعطيات دقيقة في ما يتعلق بهذا الموضوع.
    </p>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">التكاليف والأرباح في صناعة الدباغة</h3>

      <p class="text-stone-700 mb-6">
        رغم كل العوائق حاولنا ملامسة الجانب المادي من خلال رصد أهم التغيرات التي يعرفها الجانب المادي في حرفة الدباغة. اعتمادا على الزيارة الميدانية والروايات الشفوية التي استقيناها من الحرفيين، قمنا بإعطاء تصور حول الدخل الفردي لكل معلم من خلال عدد الطرحات المصنوعة، وتتبع مسار الطرحة من مرحلة الشراء (ثمن شراءها) إلى مرحلة البيع (ثمن بيعها)، مرورا بالمدة التي تصنع فيها، وكذلك المواد التي تستعمل في دباغتها (أثمنة المواد المستعملة).
      </p>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead class="bg-amber-100 text-amber-800">
            <tr>
              <th class="py-3 px-4 text-right">نوع الجلد</th>
              <th class="py-3 px-4 text-right">ثمن الشراء (الوحدة)</th>
              <th class="py-3 px-4 text-right">ثمن المواد المستعملة</th>
              <th class="py-3 px-4 text-right">مدة الإنجاز</th>
              <th class="py-3 px-4 text-right">ثمن البيع (الوحدة)</th>
              <th class="py-3 px-4 text-right">الربح (تقريبي)</th>
            </tr>
          </thead>
          <tbody class="text-stone-700">
            <tr class="border-b border-stone-200">
              <td class="py-3 px-4">جلد الغنم</td>
              <td class="py-3 px-4">70-100 درهم</td>
              <td class="py-3 px-4">15-20 درهم</td>
              <td class="py-3 px-4">7-10 أيام</td>
              <td class="py-3 px-4">150-200 درهم</td>
              <td class="py-3 px-4">50-80 درهم</td>
            </tr>
            <tr class="border-b border-stone-200">
              <td class="py-3 px-4">جلد الماعز</td>
              <td class="py-3 px-4">60-90 درهم</td>
              <td class="py-3 px-4">15-20 درهم</td>
              <td class="py-3 px-4">7-10 أيام</td>
              <td class="py-3 px-4">130-180 درهم</td>
              <td class="py-3 px-4">40-70 درهم</td>
            </tr>
            <tr class="border-b border-stone-200">
              <td class="py-3 px-4">جلد البقر</td>
              <td class="py-3 px-4">300-500 درهم</td>
              <td class="py-3 px-4">80-100 درهم</td>
              <td class="py-3 px-4">12-15 يوم</td>
              <td class="py-3 px-4">600-800 درهم</td>
              <td class="py-3 px-4">200-220 درهم</td>
            </tr>
            <tr>
              <td class="py-3 px-4">جلد الإبل</td>
              <td class="py-3 px-4">400-600 درهم</td>
              <td class="py-3 px-4">100-120 درهم</td>
              <td class="py-3 px-4">15-20 يوم</td>
              <td class="py-3 px-4">800-1000 درهم</td>
              <td class="py-3 px-4">250-300 درهم</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-100">
        <h4 class="font-bold text-amber-800 mb-4">ملاحظات اقتصادية</h4>
        <ul class="space-y-2 text-stone-700 list-disc mr-8">
          <li>حرفة الدباغة تزاوج بين الصناعة والتجارة، تبدأ بالتفاوض والمضاربة في سوق الجلد وتنتهي ببيع المنتج النهائي.</li>
          <li>يعمد الدباغ إلى شراء كميات متوسطة أو كبيرة من المواد الخام بهدف الرفع من هامش الربح.</li>
          <li>يتحكم قانون العرض والطلب في عملية البيع، مما يجعل الأسعار متذبذبة حسب المواسم.</li>
          <li>يتعامل أغلب الحرفيين بنظام "البيع بالدين"، حيث يتم تسليم الجلود للتجار مع استرداد ثمنها لاحقاً بعد تسويقها.</li>
          <li>تؤثر العوامل المناخية على مدة الإنتاج وبالتالي على الدخل الشهري للحرفي.</li>
        </ul>
      </div>
    </div>

    <div class="mt-10">
      <h4 class="font-bold text-amber-800 mb-4 text-lg">التحليل الاقتصادي لحرفة الدباغة</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <canvas id="profitMarginChart" height="250"></canvas>
          </div>
        </div>
        <div>
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <canvas id="processingTimeChart" height="250"></canvas>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">3- الأمراض المترتبة عن حرفة الدباغة</h2>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    يشتغل الدباغون في مجال مفتوح على مصراعيه أمام التعرض للأمراض والأوبئة من جراء احتكاكهم الدائم بالجلود النيئة والمتعفنة، ووقوفهم لمدد طويلة داخل الصهاريج المليئة بالماء، مما يسبب أمراض فتاكة تصيب المفاصل يصعب معالجتها بشكل نهائي.
    </p>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    في إطار الزيارة الميدانية التي قمنا بها إلى دار "الدباغ الكبيرة"، كان من بين الأسئلة التي شغلت بالنا حول ماهية الأمراض التي يصاب بها الدباغون؟ وكيف يتعاملون معها؟ وهل يتمتعون بتغطية صحية أو يستفيدون من امتيازات في المجال الطبي لاسيما، وارتباطها اليوم بمؤسسات حديثة تتمثل في التنظيمات الجمعوية؟
    </p>

    <div class="flex flex-col md:flex-row gap-8 my-8">
      <div class="md:w-3/5">
        <p class="text-lg text-stone-700 leading-relaxed mb-4">
          من المعلوم أن حرفة الدباغة تمارس بطرق تقليدية، أساسها المجهود العضلي الذي يقوم على ضغط الجلود بالأرجل وغسلها بالأيادي لنزع ما تحمله من شوائب، مما يطرح إشكالية تعرض الحرفين لأمراض جلدية كثيرة، كما أن المواد المستعملة هي مواد كيماوية سامة تسبب حروق جلدية كمادة السلفور والجير، وخصوصا أن الحرفيين كانوا يشتغلون بدون أي وسائل وقاية تذكر.
        </p>

        <p class="text-lg text-stone-700 leading-relaxed mb-4">
          فإلى عهد قريب كان معظم المعلمين يشتغلون بسراويل قصيرة ويدبغون الجلود بدون انتعال الأحذية، مما ساهم في تعرض الكثير منهم لأمراض العظام والبرودة مما يؤثر على العمود الفقري، ويسبب صعوبة في الوقوف والتحرك بشكل سليم. أما في الفترة الحالية فلقد أصبحوا يزاولون مهامهم بانتعال أحدية عالية تسمى "البوط les bottes"، والقفازات البلاستيكية للحماية.
        </p>

        <p class="text-lg text-stone-700 leading-relaxed">
          ورغم استعمال هذه الأدوات إلا أنها لا تمنع الجلد من التعرض لحروق خطيرة ناتجة عن المواد المستعملة أثناء مراحل الدبغ، ومع ذاك فهي تساهم ولو شيئا ما في تقليص نسبة الإصابة من الحروق.
        </p>
      </div>

      <div class="md:w-2/5">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-stone-200 sticky top-6">
          <h4 class="font-bold text-lg text-amber-900 mb-4">الأمراض الشائعة لدى الدباغين</h4>

          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 ml-3 mt-0.5">
                <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h5 class="font-bold text-amber-800">أمراض جلدية</h5>
                <p class="text-stone-700 text-sm">تهيج الجلد، حروق كيميائية، التهابات جلدية، تقرحات ناتجة عن التعرض للمواد الكيميائية السامة</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 ml-3 mt-0.5">
                <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h5 class="font-bold text-amber-800">أمراض المفاصل والعظام</h5>
                <p class="text-stone-700 text-sm">آلام الظهر، مشاكل في العمود الفقري، التهاب المفاصل، أمراض الروماتيزم بسبب الوقوف الطويل في الماء البارد</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex-shrink-0 ml-3 mt-0.5">
                <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h5 class="font-bold text-amber-800">أمراض تنفسية</h5>
                <p class="text-stone-700 text-sm">مشاكل في الجهاز التنفسي، حساسية، ضيق التنفس بسبب استنشاق الأبخرة المتصاعدة من المواد الكيميائية</p>
              </div>
            </div>
          </div>

          <div class="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h5 class="font-bold text-amber-800 mb-2">التغطية الصحية</h5>
            <p class="text-stone-700 text-sm">
              نادراً ما يتم تنظيم حملات طبية من طرف الجمعيات المدنية، لتلقي العلاج بشكل مجاني مع توفير بعض الأدوية، كالمراهم الجلدية المضادة للاحتراق، وتوزيع بعض الأدوات بشكل دوري كالقفازات وبعض الملابس الجلدية.
            </p>
          </div>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">التنظيم الحرفي للدباغين بين التقليدي والعصري</h2>

    <div class="not-prose rounded-lg overflow-hidden my-8">
      <div class="relative">
        <img src="/dist/images/articles/tanners-organization.jpg" alt="التنظيم الحرفي للدباغين" class="w-full h-auto object-cover rounded-lg">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-lg"></div>
        <div class="absolute bottom-0 right-0 p-4 text-white">
          <p class="text-sm">مجموعة من الدباغين المنتظمين في إحدى الجمعيات المهنية الحديثة</p>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">التنظيم الحرفي للدباغين بين التقليدي والعصري</h2>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    لا يمكن فهم مختلف التنظيمات التقليدية لحرفة الدباغة ولجميع الحرف دون العودة إلى أعراف السكان المحلين، فحسب تصورنا فإن مختلف القوانين المنظمة للحرف تدين في وجودها لهذه الأعراف، لأنها في جذورها وأصولها تنظيمات قديمة متجدرة في عمق التاريخ.
    </p>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    والحياة داخل الجماعة لا تخلو من منازعات (اقتصادية، وعائلية، وجنائية...) ولضمان الاستقرار الأمني تم سن هذه القوانين "في منطقة سوس مثلا والمدونة على ألواح خشبية أو على جلود الحيوانات أو على ورق ضاربة في القدم".
    </p>

    <div class="not-prose grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
        <div class="h-48 overflow-hidden">
          <img src="/dist/images/articles/traditional-organization.jpg" alt="التنظيم التقليدي لحرفة الدباغة" class="w-full h-full object-cover">
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-amber-900 mb-3">تنظيمات تقليدية في جزولة</h3>
          <p class="text-stone-700 mb-4">
            برز في جزولة هيئتين أو تنظيمين من خلال قراءة ألواحها، مما يدل على وجود نظام قضائي عرفي بسوس، وهما:
          </p>
          <ul class="space-y-2 text-stone-700 list-disc mr-8">
            <li><span class="font-bold text-amber-800">العلماء:</span> هم من حملة القرآن ومتفقهون في الدين، يتولون النظر في توزيع أنصبة الماء والإرث والزواج والطلاق، وغالبا ما يكون الحكم بالتراضي في أي مسألة تعرض عليهم.</li>
            <li><span class="font-bold text-amber-800">أعيان الجماعة (ئنفلاس):</span> مفرده أنفلوس ومعناه المعين أو المقدم أو النقيب أو العريف، ومهامهم تنحصر في الجنايات وبعض المسائل المدنية، وما يحدث في الأسواق من غش ونقص في المكاييل والوزن وما إلى ذلك.</li>
          </ul>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-stone-200">
        <div class="h-48 overflow-hidden">
          <img src="/dist/images/articles/market-supervision.jpg" alt="الرقابة في الأسواق التقليدية" class="w-full h-full object-cover">
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold text-amber-900 mb-3">دور الأعيان في مراقبة الأسواق</h3>
          <p class="text-stone-700 mb-4">
            ينفذ الأعيان ما أبرمته القبيلة في لوح السوق، بهدف الحفاظ على الأمن داخله، لذلك تنظم الحراسة الليلية والنهارية، كما يراقب الأعيان الموازيين والمكاييل وسوق الحيوانات، ويتم الإعلان بواسطة البراح من تم ضبطه متلبسا مما يجعله عرضة للغرامات والعقوبات.
          </p>
          <blockquote class="bg-amber-50 p-3 rounded-md border border-amber-100 text-sm italic">
            <p class="text-stone-700">
              "لقد تحدث روجي لوطورنو في كتابه 'فاس قبل الحماية'، عن بعض العقوبات ووسائل الإكراه التقليدية التي يردع بها الغشاشون من الدباغين والخرازين، وهي عقوبة التشهير أو التطويف والتجوال الإجباري... معترفا جهرا بخطئه..."
            </p>
          </blockquote>
        </div>
      </div>
    </div>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    وليس لهؤلاء الأعيان مرتب مضمون لا من بيت المال ولا من القبيلة، بل يكتفون بنسبة مئوية مما ينصفون به المخالفين.
    </p>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    ولقد مرت حرفة الدباغة مثلها مثل جل الحرف التقليدية العتيقة، بمراحل تنظيمية مهمة، فالتنظيم شكل أداة لاستمرارها في ظل التغيرات التي كانت تهددها من حين إلى حين. وفي اعتقادنا بأن ما كان لحرفة الدباغة من شأن كبير داخل النخبة المغربية وما نسجه الحرفيين من علاقات قوية مع السلطة في الفترات الوسيطية والحديثة، وبناءا على الأعراف القديمة ساهم في توفير تراكم تنظيمي مهم، انطلق في أشكاله البسيطة من الأسواق الأسبوعية نموذج (سوس-جزولة)، إلى تنظيمات مركبة ظهرت في المدن (نموذج الدباغة).
    </p>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">التنظيم الحرفي التقليدي للدباغين</h3>

      <p class="text-stone-700 mb-6">
        الانتشار الواسع للدباغة وما كانت تدره من أرباح كبيرة في بلاد المغرب جنبا إلى جنب مع حرف أخرى "حيث تعتبر طائفة صناع الجلد من دباغين وخرازين وطرافين وصماطين من أهم الحرف في صناعات المغرب التاريخية، وذلك بكثرة من يشتغلون بها ويعيشون منها وبالتقاليد المراعاة فيها وقواعد حسبتها والطرائف والعوائد المرتبطة بها" مما ساهم بدوره في تعزيز هذا التنظيم.
      </p>

      <p class="text-stone-700 mb-6">
        وفي هذا الإطار "استوجب التنظيم العام لهذه الحرف في بلاد المغرب أن يكون لكل طائفة أو مجموعة من أصحاب الحرفة الواحدة 'عريف' يشرف عليه، ولم يكن ينتخب بواسطة زملائه، وإنما يختاره المحتسب".
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 class="text-xl font-bold text-amber-800 mb-4">هيكل التنظيم التقليدي</h4>
          <div class="space-y-6">
            <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
              <h5 class="font-bold text-amber-800 mb-2">المحتسب</h5>
              <p class="text-stone-700 text-sm">
                هو الذي يقيم الانسجام الضروري بين الحرفيين، وهو الذي يسعر المواد الضرورية لحياة المدينة (المواد الأساسية)، ويسهر على سيادة الاستقرار في أسعار الصرف، وهو الذي يتحكم في النزاعات التي لا تفتأ تثار بين التجار والصناع، وبين البائعين والمشترين، ويسهر على أمانة المبادلات ويعاقب المدلسين.
              </p>
            </div>

            <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
              <h5 class="font-bold text-amber-800 mb-2">الأمين</h5>
              <p class="text-stone-700 text-sm">
                هو حرفي اكتسب تجربة ومهارة قل نظيرهما، وعمل لفترة زمنية طويلة في المجال، فأصبحت له دراية بحيثيات الحرفة وكل ما يتعلق بتنظيمها. يتم اختياره من طرف مهنيي هذه الحرفة، لاتسامه بالأمانة وكونه موضع ثقة، يستطيع أن يسهر على تسيير أمورهم وحل قضاياهم المهنية، ومراقبة الإنتاج والدفاع عن مصالح أعضاء هذه الحنطة.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div class="space-y-6">
            <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
              <h5 class="font-bold text-amber-800 mb-2">المعلم</h5>
              <p class="text-stone-700 text-sm">
                يتميز بإتقانه للحرفة، حيث يسبر أغوارها حتى يصل إلى هذه الدرجة، فهو لا يقل عن مكانة الأمين من حيث الخبرة ومع مرور السنوات يمكن أن يكون أمينا بدوره، وفي دار الدباغة يملك كل معلم قصرية أو أكثر، ويكون له مجموعة من المتعلمين.
              </p>
            </div>

            <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
              <h5 class="font-bold text-amber-800 mb-2">المتعلم</h5>
              <p class="text-stone-700 text-sm">
                يكون تابعا للمعلم يساعده في عمله، ويقوم بمجموعة من المهام التي يلزمه بها معلمه، وكانوا شبانا أو صبيانا يتعلمون الحرفة، يكتفون في البداية بمشاهدة المعلم والعمال يشتغلون ويؤدون بالمقابل بعض الخدمات الطفيفة... وكان المعلم يعطيهم من حين إلى آخر قطعة نقدية صغيرة إذا سر بهم، تلك كانت جائزة لا أجرة. وإذا ما استطاعوا أن يؤدوا خدمات كافية كانوا يتقاضون أجرة أسبوعية تافهة في البداية، وتزداد أهمية كل ما ازدادت معلوماتهم.
              </p>
            </div>
          </div>

          <div class="mt-6">
            <div class="rounded-lg overflow-hidden">
              <img src="/dist/images/articles/traditional-hierarchy.jpg" alt="التسلسل الهرمي للتنظيم الحرفي التقليدي" class="w-full h-auto">
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3 class="text-2xl font-bold text-amber-800 mb-4">التنظيم العصري</h3>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    حاول الحرفيون في الفترة الراهنة تنظيم أنفسهم في إطار جمعيات وتعاونيات، استجابة لمتطلبات العصر، خصوصا أن الأشكال التنظيمية العتيقة لم تعد مواكبة لمختلف المتغيرات سواء من حيث العمل وكذلك من حيث تسويق المنتجات الجلدية، في ظل المنافسة العالمية، والتصنيع الآلي الحديث.
    </p>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    في حين أن الدولة تدخلت في شق التكوينات المرتبطة بهذه الحرفة، من خلال فتح أوراش متنوعة لتأهيل اليد العاملة الحرفية ومدها بالأسس العلمية لطرق العمل، وفي هذا الإطار سنحاول الوقوف على هاتين النقطتين باقتضاب على الشكل الآتي:
    </p>

    <div class="flex flex-col md:flex-row gap-8 my-8">
      <div class="md:w-1/2">
        <h4 class="text-xl font-bold text-amber-900 mb-4">من حيث التنظيم</h4>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-stone-200 h-full">
          <p class="text-stone-700 mb-4">
            ساهمت مجموعة من العوامل في الدفع بالحرفين التقليدين إلى التكتل في تنظيمات عصرية تتمثل في الجمعيات المدنية، من أهمها المنافسة القوية للصناعات الحديثة، حيث أن استعمال الآلات في دباغة الجلود رفع من التحدي بالنسبة للحرفين التقليدين لا سواء من حيث جودة منتوجاتهم ولا من حيث كميتها.
          </p>
          <p class="text-stone-700 mb-4">
            بالإضافة إلى أن الفراغ القانوني والغموض على مستوى النصوص التشريعية وخاصة في باب حماية الحرف التقليدية من الاندثار. وهذا ما ساهم في التوجه الجديد نحو تأسيس هذه الجمعيات الذي كان بتشجيع من الدولة، للاستفادة من الهبات المقدمة سواء منها أو من المؤسسات المهتمة بالنهوض بالصناعة التقليدية أو كذلك من الأفراد الغيورين على هذا القطاع.
          </p>
          <p class="text-stone-700">
            وفيما يخص التنظيم التقليدي للحرفة، فلم يعد هناك أمناء كما في السابق، ولكن أصبح رؤساء الجمعيات هم المكلفين بشؤون الحنطة، ولكل حرفة جمعيتها، ويمكن كذلك أن تجتمع مجموعة من الحرف في جمعية واحدة، ويكون لها ممثل في المجالس المنتخبة وفي البرلمان.
          </p>
        </div>
      </div>

      <div class="md:w-1/2">
        <h4 class="text-xl font-bold text-amber-900 mb-4">من حيث التكوين</h4>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-stone-200 h-full">
          <div class="rounded-lg overflow-hidden mb-4">
            <img src="/dist/images/articles/modern-tanning-training.jpg" alt="التكوين الحديث في مجال الدباغة" class="w-full h-auto">
          </div>

          <p class="text-stone-700 mb-4">
            اهتمت الدولة في الآونة الأخيرة بتنظيم مجموعة من التكوينات لفائدة الحرفين المشتغلين بالدباغة، وكانت الأهداف العامة لهذا التوجه هو تكوين يد عاملة مؤهلة ذات كفاءة عالية، تضمن استمرار الحرفة في ظل المتغيرات الحالية، وتشجيع الشباب على الاجتهاد والابتكار في طرق العمل، بأشكال علمية رصينة.
          </p>

          <p class="text-stone-700 mb-4">
            ومن أجل مساعدة الصناع على تطوير أساليبهم أحدثت وزارة الصناعة التقليدية مراكز التكوين المهني في هذا الفن ومركبات الصناعة والعرض والبيع. فهي حرفة لازالت أهميتها واضحة في عدة قطاعات، كالسياحة، والصناعات المتطورة كصناعة السيارات التي تعتمد على الجلود المغربية المصنفة عالميا، وصناعة النسيج في شكل ملابس جلدية متنوعة، وحقائب اليد في جميع الأشكال والأنواع.
          </p>
        </div>
      </div>
    </div>

    <div class="not-prose bg-amber-50 rounded-lg p-6 my-10 border border-amber-100">
      <h3 class="text-2xl font-bold text-amber-900 mb-4">إحصائيات حول صناعة الجلد في المغرب حالياً</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-5 rounded-lg shadow-sm">
          <div class="text-center mb-3">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-700 text-xl font-bold">
              15K
            </div>
          </div>
          <h4 class="font-bold text-amber-800 text-center mb-2">وحدة صناعية</h4>
          <p class="text-stone-700 text-sm text-center">
            يبلغ عدد وحدات صناعة الجلد حاليا حوالي 15000 وحدة في كافة أنحاء المغرب
          </p>
        </div>

        <div class="bg-white p-5 rounded-lg shadow-sm">
          <div class="text-center mb-3">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-700 text-xl font-bold">
              50K
            </div>
          </div>
          <h4 class="font-bold text-amber-800 text-center mb-2">صانع وحرفي</h4>
          <p class="text-stone-700 text-sm text-center">
            تشغل هذه الوحدات ما يزيد عن 50000 صانع، أي بمعدل 3.3 صانع لكل وحدة
          </p>
        </div>

        <div class="bg-white p-5 rounded-lg shadow-sm">
          <div class="text-center mb-3">
            <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-700 text-xl font-bold">
              77%
            </div>
          </div>
          <h4 class="font-bold text-amber-800 text-center mb-2">تركز الإنتاج</h4>
          <p class="text-stone-700 text-sm text-center">
            يصنع بفاس 27% من الإنتاج وبمراكش 27% وبالدار البيضاء 23% من إجمالي الإنتاج
          </p>
        </div>
      </div>

      <div class="mt-6 bg-white p-5 rounded-lg shadow-sm">
        <h4 class="font-bold text-amber-800 mb-3">التوزيع حسب نوع الصناعة</h4>
        <div class="flex flex-wrap gap-3">
          <div class="bg-amber-50 px-4 py-2 rounded-lg border border-amber-100 text-amber-800">
            <span class="font-bold">40%</span> السكافة
          </div>
          <div class="bg-amber-50 px-4 py-2 rounded-lg border border-amber-100 text-amber-800">
            <span class="font-bold">30%</span> صناعة الأحذية
          </div>
          <div class="bg-amber-50 px-4 py-2 rounded-lg border border-amber-100 text-amber-800">
            <span class="font-bold">15%</span> مبتكرات أخرى
          </div>
          <div class="bg-amber-50 px-4 py-2 rounded-lg border border-amber-100 text-amber-800">
            <span class="font-bold">15%</span> صناعات متنوعة
          </div>
        </div>
      </div>

      <div class="mt-4 text-stone-700 text-center">
        <p>فكيف يمكن تحسيس الحرفي بهذه الأهمية المتزايدة؟ وكيف يمكن تطوير الإنتاج وتسريع وثيرته مع الحفاظ على الصبغة التقليدية للصناعة التي تشتهر بها دروب وأزقة المدن المغربية؟</p>
      </div>
    </div>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">مقارنة بين الدباغة التقليدية والحديثة</h3>

      <!-- Interactive Before/After Image Comparison Slider -->
      <div id="comparison-slider" class="relative overflow-hidden rounded-lg h-96 mb-8">
        <!-- Background Image (Modern Tanning) -->
        <img id="background-image" src="/dist/images/articles/modern-tanning.jpg" alt="الدباغة الحديثة" class="absolute inset-0 w-full h-full object-cover">
        
        <!-- Foreground Image (Traditional Tanning) with adjustable width -->
        <div id="foreground-image" class="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden">
          <img src="/dist/images/articles/traditional-tanning.jpg" alt="الدباغة التقليدية" class="absolute inset-0 w-auto h-full min-w-max object-cover" style="right: 0;">
        </div>
        
        <!-- Slider Control -->
        <div id="slider-control" class="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize" style="right: 50%;">
          <div class="absolute top-1/2 right-0 transform -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-700" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        
        <!-- Labels -->
        <div class="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">الدباغة التقليدية</div>
        <div class="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">الدباغة الحديثة</div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <h4 class="font-bold text-amber-800 mb-3">الدباغة التقليدية</h4>
          <ul class="space-y-2 text-stone-700 list-disc mr-6">
            <li>تعتمد على المواد الطبيعية مثل النخالة ودرق الحمام والميموزة</li>
            <li>تستخدم القصريات والأحواض الحجرية التقليدية</li>
            <li>تتطلب وقتاً أطول للإنجاز (قد تصل إلى 20 يوماً)</li>
            <li>المهارة اليدوية هي العامل الأساسي في جودة المنتج</li>
            <li>تنتج جلوداً بخصائص فريدة تناسب المنتجات التقليدية المغربية</li>
            <li>تأثيرها البيئي محدود نسبياً لاعتمادها على مواد طبيعية</li>
          </ul>
        </div>

        <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <h4 class="font-bold text-amber-800 mb-3">الدباغة الحديثة</h4>
          <ul class="space-y-2 text-stone-700 list-disc mr-6">
            <li>تعتمد على المواد الكيميائية المصنعة مثل الكروم والمواد الحافظة</li>
            <li>تستخدم أحواضاً وآلات حديثة من الفولاذ المقاوم للصدأ</li>
            <li>تختصر زمن الإنتاج بشكل كبير (2-5 أيام فقط)</li>
            <li>تعتمد على التكنولوجيا والآلات في ضبط جودة المنتج</li>
            <li>تنتج كميات أكبر بتكلفة أقل وبموصفات قياسية</li>
            <li>لها تأثير بيئي أكبر بسبب المخلفات الكيميائية</li>
          </ul>
        </div>
      </div>

      <div class="mt-8 bg-stone-100 p-5 rounded-lg">
        <h4 class="font-bold text-amber-800 mb-3">تأثير التحول نحو التقنيات الحديثة</h4>
        <p class="text-stone-700">
          رغم المزايا العديدة للطرق الحديثة في الدباغة من حيث السرعة والإنتاجية، إلا أن الباحثين يؤكدون أن الجلود المدبوغة تقليدياً تتمتع بمزايا لا توفرها الطرق الحديثة، خاصة من حيث متانة المنتج وعمره الافتراضي والخصائص التقليدية المميزة للجلد المغربي. وتشكل المهارات التقليدية المتوارثة عبر الأجيال جزءاً مهماً من التراث الثقافي للمغرب الذي يواجه خطر الاندثار مع انتشار الطرق الحديثة.
        </p>

        <div class="flex items-center justify-center mt-4">
          <button id="playPauseButton" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            <i class="fas fa-play ml-1"></i><span>تحريك المقارنة</span>
          </button>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">الآثار الاقتصادية لحرف الدباغة في المغرب</h2>

    <!-- Economic Impact Visualization -->
    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-bold text-amber-900 mb-4">تطور الصادرات المغربية من الجلود (2020-2025)</h3>
          <div class="bg-stone-50 rounded-lg p-4">
            <canvas id="exportGrowthChart" height="300"></canvas>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold text-amber-900 mb-4">توزيع الحرف المائية في المغرب</h3>
          <div class="bg-stone-50 rounded-lg p-4">
            <canvas id="waterCraftsDistributionChart" height="300"></canvas>
          </div>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <div class="flex items-center">
            <div class="rounded-full w-12 h-12 bg-amber-100 flex items-center justify-center text-amber-700 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3.895-3 2s1.343 2 3 2 3.895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="font-bold text-amber-800">المساهمة في الناتج المحلي</h4>
              <p class="text-stone-700 text-sm">تمثل حرفة الدباغة وصناعة الجلود 2.8% من الناتج المحلي الإجمالي للمغرب، بقيمة سنوية تقدر بـ 3.7 مليار درهم.</p>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <div class="flex items-center">
            <div class="rounded-full w-12 h-12 bg-amber-100 flex items-center justify-center text-amber-700 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="font-bold text-amber-800">فرص العمل</h4>
              <p class="text-stone-700 text-sm">توفر الحرف المائية أكثر من 75000 فرصة عمل مباشرة في المغرب، بالإضافة إلى 150000 فرصة عمل غير مباشرة في قطاعات مرتبطة.</p>
            </div>
          </div>
        </div>

        <div class="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <div class="flex items-center">
            <div class="rounded-full w-12 h-12 bg-amber-100 flex items-center justify-center text-amber-700 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div class="ml-3">
              <h4 class="font-bold text-amber-800">الاستدامة البيئية</h4>
              <p class="text-stone-700 text-sm">تم إطلاق 12 مشروعاً لتحسين البصمة البيئية للدباغة التقليدية، مما أدى إلى تخفيض استهلاك المياه بنسبة 35% بين عامي 2020 و2025.</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">خاتمة</h2>

    <p class="text-xl text-stone-700 leading-relaxed mb-5">
    يمكن القول بأن حرفة الدباغة، مثلها مثل جل الحرف التقليدية العتيقة، مرت بمجموعة من المراحل، عاشت فترات ازدهار بلغت حد التحكم في دواليب السلطة السياسية في البلاد، وتمكنت من أن تراكم ثروات مالية كبيرة بين الفترات التاريخية، مما ساهم في بروز مدن عرفت بصناعة الدباغة كمراكش وفاس وسلا..، ولكنها ستشهد في مرحلة أخرى تراجعا كبيرا لازال مستمرا لحدود الساعة، نظرا لعدة اعتبارات ذكرناها في ثنايا العرض.
    </p>

    <div class="not-prose rounded-lg overflow-hidden my-8">
      <div class="relative">
        <img src="/dist/images/articles/tannery-conclusion.jpg" alt="صورة ختامية لدار الدباغة التقليدية" class="w-full h-auto object-cover rounded-lg">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent إلى-black/60 rounded-lg"></div>
        <div class="absolute bottom-0 right-0 p-4 text-white">
          <p class="text-sm">دور الدباغة التقليدية - تراث يواجه تحديات العصر</p>
        </div>
      </div>
    </div>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    لقد حاولنا قدر المستطاع ملامسة جوانب متعددة حسب أهميتها، وانطلاقنا من موقف الإسلام من الدباغة والدباغ، من خلال طرح نصين مهمين حول حضور الذكاة في باب الطهارة وما لها من دور في القيام بالفرائض الدينية على الوجه الصحيح، وكون دباغة الجلد هو تطهير لها، ونقصد هنا جلود الحيوانات التي يجوز أكل لحومها، وتحريم الانتفاع بجلود الخنزير نظرا لوجود نص قرآني صريح بتحريم أكل لحمه.
    </p>

    <p class="text-lg text-stone-700 leading-relaxed mb-5">
    وفي نفس الوقت تطرقنا لموقف الإسلام من الدباغ وإن لم نجد إشارات مباشرة في هذا الباب ولكن حاولنا استخلاص مجموعة من المؤشرات حول علاقة الحرفي بموضع الدبغ وبعلاقته بالجلود. فكما نعلم أن الفرائض تستوجب طهارة المكان والملبس من جهة، ودور الدباغة تعرف بجمعها لدنس الجلود النيئة من جهة أخرى، فهذين الطرحين فتحا الباب أمامنا للإجابة عن هذا الإشكال ولو جزئيا.
    </p>

    <div class="not-prose bg-white rounded-xl shadow-sm p-8 my-10 border border-stone-200">
      <h3 class="text-2xl font-bold text-amber-900 mb-6 pb-3 border-b border-stone-200">أهم الخلاصات المستفادة من الدراسة</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ul class="space-y-3 text-stone-700 list-disc mr-6">
            <li>كانت أهم الخلاصات التي لامسناها في الزيارة الميدانية، هو تموضع أماكن الصلاة في زاوية بعيدة عن أماكن تجمع النجاسة، ثم أن الحرفي وجب عليه تنظيف ملبسه وجسده أو حمايته من ملامسة النجاسة للقيام بشعائره الدينية بالشكل الصحيح.</li>
            <li>الرأيان اللذان وقفنا عندهما يجمعان على ما للدباغة من أدوار هامة في إضفاء الشرعية على استعمال الجلود والانتفاع بها، مما يفتح المجال للحديث عن الحرفة بحد ذاتها، التي تعتبر ذات قيمة مهمة في المجتمع الإسلامي.</li>
            <li>في محاولة منا تحديد الإطار الزمني والمجالي لهذه الحرفة قمنا بتتبع مجموعة من الإشارات حولها في المغرب منذ الفترة الوسيطية، واستخلاص الأهمية المحورية التي شكلتها في الدول المتعاقبة على الحكم سواء في الميدان الصناعي والتجاري وكذلك العسكري.</li>
          </ul>
        </div>

        <div>
          <ul class="space-y-3 text-stone-700 list-disc mr-6">
            <li>بلغت طائفة الدباغين مراتب مهمة في الميدان السياسي، ولكن ستتراجع هذه الحرفة في الفترة الحديثة وخاصة في القرن التاسع عشر وما كان للتحولات العالمية من أثر على المستوى الداخلي في المغرب.</li>
            <li>اتجهنا لدراسة جانب مظلم في المجتمع يرتبط بالمعتقدات الشعبية، ووقفنا عند مجموعة من النقط التي عملنا على تحليلها قدر المستطاع، فمن الصعب البحث في حيثيات هذا الموضوع نظرا لعدة اعتبارات، أهمها الخوف الذي يعتري الحرفيين وخاصة عندما تطرح عليهم أسئلة مباشرة حول آرائهم حول هذه النقطة.</li>
            <li>استنتجنا أن الدباغة حرفة سائرة نحو الاندثار، ليس لعدم أهميتها وإنما لغزو الصناعة الجلدية الأجنبية، التي تتميز بالدقة في الكيف والكم. ولا يمكن إعادة الاعتبار للصناعة المحلية إلا بإعطاء الجيل الجديد من الحرفين فرصة للاجتهاد والعمل بشكل علمي حديث وعقلاني ومنظم، لعلهم يرفعون تحدي السير بالحرفة إلى مصاف الدول المتقدمة.</li>
          </ul>
        </div>
      </div>
    </div>

    <h2 class="text-3xl font-bold text-amber-900 border-b-2 border-amber-500/50 pb-3 mb-6">لائحة المصادر والمراجع</h2>

    <div class="not-prose grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
      <div class="md:col-span-1">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-stone-200 sticky top-6">
          <h3 class="text-xl font-bold text-amber-900 mb-4">تصنيف المراجع</h3>
          <div class="space-y-3">
            <a href="#primary-sources" class="block px-4 py-2 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors text-amber-800 font-medium text-right">
              المصادر الأولية
            </a>
            <a href="#studies" class="block px-4 py-2 bg-amber-50 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors text-amber-800 font-medium text-right">
              المراجع والدراسات
            </a>
          </div>

          <div class="mt-8">
            <div class="rounded-lg overflow-hidden">
              <img src="/dist/images/articles/ancient-manuscripts.jpg" alt="مخطوطات قديمة حول الحرف التقليدية" class="w-full h-auto">
            </div>
            <p class="text-stone-500 text-sm text-center mt-2">مخطوطات تاريخية تناولت حرف الدباغة</p>
          </div>
        </div>
      </div>

      <div class="md:col-span-2">
        <div id="primary-sources">
          <h3 class="text-xl font-bold text-amber-900 mb-4">المصادر</h3>
          <ul class="space-y-3 text-stone-700 list-none">
            <li class="pb-2 border-b border-stone-100">القرآن الكريم، برواية ورش.</li>
            <li class="pb-2 border-b border-stone-100">ابن حوقل أبو القاسم النصيبي: "صورة الأرض"، منشورات دار مكتبة الحياة، بيروت، لبنان، 1992م.</li>
            <li class="pb-2 border-b border-stone-100">ابن خلدون عبدالرحمان: "العبر وديوان المبتدأ والخبر في تاريخ العرب والعجم والبربر ومن عاصرهم من دوي السلطان الأكبر"، طبعة مصححة، أخرجها أبو صهيب الكرمي، بيت الأفكار الدولية، الأردن.</li>
            <li class="pb-2 border-b border-stone-100">ابن الزيات يوسف بن يحيى التادلي: "التشوف إلى رجال التصوف وأخبار أبي العباس السبتي"، تحقيق: أحمد توفيق، منشورات كلية الآداب والعلوم الإنسانية، الرباط، 1404هـ/1984م.</li>
            <li class="pb-2 border-b border-stone-100">الإمام الشافعي، تقي الدين أبي بكر بن محمد الحسيني الحصني الدمشقي: "كفاية الأخيار في حل في غاية الاختصار"، تحقيق وتعليق: كامل محمد عويضة، نشر دار الكتب العلمية، بيروت، لبنان، 1422هـ/2001م.</li>
            <li class="pb-2 border-b border-stone-100">الأندلسي، أبو محمد على ابن أحمد حزم: "المحلى بالآثار"، كتاب الطهارة، تحقيق: عبدالغفار سليمان النياري، ج1، منشورات دار الكتب العلمية، بيروت، لبنان، ط3، 1424هـ/2003م.</li>
            <li class="pb-2 border-b border-stone-100">الجزنائي أبو الحسن علي: "جني زهرة الآس في بناء مدينة فاس"، تحقيق عبد الوهاب ابن منصور، مؤرخ المملكة المغربية، ط2، الرباط، 1411ه-1991م.</li>
            <li class="pb-2 border-b border-stone-100">السملالي العباس بن إبراهيم: "الإعلام بمن حل مراكش وأغمات من الأعلام"، راجعه عبدالوهاب ابن منصور، ج1، ط2، المطبعة الملكية، الرباط، 1413هـ/1993 م.</li>
            <li class="pb-2 border-b border-stone-100">الشريف الإدريسي: "نزهة المشتاق في اختراق الآفاق"، المجلد الأول، نشر مكتبة الثقافة الدينية.</li>
            <li class="pb-2 border-b border-stone-100">الشيبلي، بدر الدين ابي عبدالله محمد بن عبدالله: "آكام المرجان في أحكام الجان"، صححه: أحمد عبدالسلام، منشورات دار الكتب العلمية، بيروت، لبنان.</li>
            <li class="pb-2 border-b border-stone-100">القرافي أحمد ابن إدريس: "الذخيرة"، باب الطهارة، تحقيق: محمد حجي، الجزء الأول، ط1، دار الغرب، بيروت، لبنان، 1994.</li>
            <li class="pb-2 border-b border-stone-100">الكتاني أبي عبدالله محمد بن جعفر بن ادريس: "سلوة الأنفاس ومحادثة الأكياس بمن أقبر من العلماء الصلحاء بفاس"، الموسوعة الكتانية لتاريخ فاس، ج1، تحقيق: الشريف محمد بن على الكتاني.</li>
            <li class="pb-2 border-b border-stone-100">الناصري أحمد بن خالد: "الاستقصا لاخبار دول المغرب الأقصى"، تحقيق وتعليق: جعفر الناصري، محمد الناصري، دار الكتاب، الدارالبيضاء، 1954.</li>
          </ul>
        </div>

        <div id="studies" class="mt-10">
          <h3 class="text-xl font-bold text-amber-900 mb-4">المراجع والدراسات</h3>
          <ul class="space-y-3 text-stone-700 list-none">
            <li class="pb-2 border-b border-stone-100">أديوان محمد، المصطلحات الأمازيغية في تاريخ المغرب وحضارته، تحت إشراف: محمد حمام، ج2، نشر المعهد الملكي للثقافة الأمازيغية، مطبعة المعارف، الرباط، 2005.</li>
            <li class="pb-2 border-b border-stone-100">أزايكو على صدقي: "نماذج من أسماء الأعلام الجغرافية والبشرية المغربية"، منشورات المعهد الملكي للثقافة الأمازيغية.</li>
            <li class="pb-2 border-b border-stone-100">أمرير عمر: "الشعر الأمازيغي المنسوب إلى سيدي حمو الطالب"، منشورات جامعة الحسن الثاني"كلية الآداب والعلوم الإنسانية، الدارالبيضاء، 5 ربيع الثاني 1407هـ/8 دجنبر 1986م.</li>
            <li class="pb-2 border-b border-stone-100">أوسوس محمد: "كوكرا في الميتولوجيا الأمازيغية"، نشر المعهد الملكي للثقافة الأمازيغية، مركز الدراسات الأنتروبولوجيا والسوسيولوجيا، سلسلة دراسات رقم 9، 2008.</li>
            <li class="pb-2 border-b border-stone-100">بن الشرقي حصري أحمد: "ارتسامات ومعطيات تاريخية حول مدينة مراكش"، ج1، المطبعة والوراقة الوطنية، مراكش، 1986.</li>
            <li class="pb-2 border-b border-stone-100">باصي روني: "أبحاث في دين الأمازيغ"، ترجمة بوقريقة يوسف وحمو بوشخار، مطبعة النجاح الجديدة، ط1، 2012.</li>
            <li class="pb-2 border-b border-stone-100">بشير عبدالرحمان: "اليهود في المغرب العربي ما بين 22هـ\_ 462هـ/642م_1070م"، نشر عين الدراسات والبحوث الإنسانية والإجتماعية، ط1، 2001.</li>
            <li class="pb-2 border-b border-stone-100">تقي عمر: "الأمازيغية ومصطلحاتها القانونية"، مطبعة فضالة، المحمدية، 1997.</li>
            <li class="pb-2 border-b border-stone-100">الدباغ محمد عبدالعزيز: "معلمة المغرب"، ج12، الجمعية المغربية للتأليف والترجمة والنشر، مطابع سلا، الرباط، 1984، ص: 3957.</li>
            <li class="pb-2 border-b border-stone-100">السبتي عبد الأحد وفرحات حليمة: "المدينة في العصر الوسيط، قضايا ووثائق من تاريخ الغرب الإسلامي"، المركز الثقافي العربي، ط1، 1984.</li>
            <li class="pb-2 border-b border-stone-100">الشابي مصطفى: "النخبة المخزنية في مغرب القرن التاسع عشر"، منشورات كلية الآداب والعلوم الإنسانية، الرباط، 1995.</li>
            <li class="pb-2 border-b border-stone-100">الطويل محمد حجاج: "معلمة المغرب"، مادة: الجير، ج10، الجمعية المغربية للتأليف والترجمة والنشر، مطابع سلا، الرباط 1984.</li>
            <li class="pb-2 border-b border-stone-100">الطويل محمد حجاج: "معلمة المغرب"، مادة الجلد، الجمعية المغربية للتأليف والترجمة والنشر، ج10، مطابع سلا، الرباط، 1984.</li>
            <li class="pb-2 border-b border-stone-100">العبودي محمد بناصر: "معجم السفر والارتحال عند العامة"، دار الثنوثية للنشر والتوزيع، الرياض، 1433هـ/2012م.</li>
            <li class="pb-2 border-b border-stone-100">مارمول كاربخال: "إفريقيا"، ج2، ترجمة: محمد حجي، محمد زنيبر، محمد الأخضر، أحمد توفيق، أحمد بنجلون، مكتبة المعارف للنشر والتوزيع، الرباط، 1404هـ/1984م.</li>
            <li class="pb-2 border-b border-stone-100">المحامى محمد عبدالله عناى: "تاريخ العرب في اسبانيا أو تاريخ الأندلس"، ط1، منشورات مطيعة السعادة، 1924.</li>
            <li class="pb-2 border-b border-stone-100">حماد محمد راشد: "نجارة الأثاث في مصر القديمة"، تقديم: زاهي حواس، مطابع المجلس الأعلى للآثار.</li>
            <li class="pb-2 border-b border-stone-100">حسن على حسن: "الحضارة الإسلامية في المغرب والأندلس عصر المرابطين والموحدين"، كلية دار العلوم جامعة القاهرة، ط1، منشورات الخنانجي، مصر.</li>
            <li class="pb-2 border-b border-stone-100">رجب عبد الجواد إبراهيم: "معجم المصطلحات الإسلامية في المصباح المنير"، دار الآفاق العربية، ط 1، القاهرة، 1423هـ/2002م.</li>
            <li class="pb-2 border-b border-stone-100">زوانات زكية: "معلمة المغرب"، ج12، الجمعية المغربية للتأليف والترجمة والنشر، مطابع سلا، الرباط، 1984، ص3960.</li>
            <li class="pb-2 border-b border-stone-100">لوطورنو روجي: "فاس قبل الحماية"، ج 1، دار الغرب الاسلامي، ترجمة: محمد حجي ومحمد الأخضر، بيروت، لبنان، 1406هـ/1486 م.</li>
            <li class="pb-2 border-b border-stone-100">محمد شفيق: "المعجم العربي الأمازيغي"، ج1، أكاديمية المملكة المغربية، الرباط، 1989، ص:153.</li>
            <li>شفيق محمد: "الدارجة المغربية مجال توارد بين الأمازيغية والعربية"، مطبعة المعارف الجديدة، الرباط، 1999.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="not-prose bg-amber-50 rounded-lg p-6 border-r-4 border-amber-500 mb-8">
      <div class="flex items-start">
        <div class="flex-shrink-0 ml-4">
          <svg class="h-6 w-6 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-medium text-amber-800">عن المؤلفين</h2>
          <p class="mt-1 text-stone-700">
            سلك الماستر: الماء في تاريخ المملكة المغربية<br>
            كلية الآداب والعلوم الإنسانية، جامعة القاضي عياض - مراكش<br>
            وحدة: الحرف المائية<br>
            تحت إشراف الدكتور: توفيق محمد لقبايبي
          </p>
          <p class="mt-3 text-stone-700 text-sm text-left">
            تاريخ النشر: 19 فبراير، 2025<br>
            آخر تحديث: 21 مارس، 2026
          </p>
        </div>
      </div>
    </div>
</div>
