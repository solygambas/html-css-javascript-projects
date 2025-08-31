const testimonialsContainer = document.querySelector(".testimonials-container");
const testimonialContainer = document.querySelector(".testimonial-container");
const testimonial = document.querySelector(".testimonial");
const userImage = document.querySelector(".user-image");
const username = document.querySelector(".username");
const role = document.querySelector(".role");
const progressBar = document.querySelector(".progress-bar");

const testimonials = [
  {
    name: "Miyah Myles",
    position: "Marketing",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max",
    text: "I've worked with literally hundreds of HTML/CSS developers and I have to say the top spot goes to this guy. This guy is an amazing developer. He stresses on good, clean code and pays heed to the details. I love developers who respect each and every aspect of a throughly thought out design and do their best to put it in code. He goes over and beyond and transforms ART into PIXELS - without a glitch, every time.",
  },
  {
    name: "June Cha",
    position: "Software Engineer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "This guy is an amazing frontend developer that delivered the task exactly how we need it, do your self a favor and hire him, you will not be disappointed by the work delivered. He will go the extra mile to make sure that you are happy with your project. I will surely work again with him!",
  },
  {
    name: "Iida Niskanen",
    position: "Data Entry",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "This guy is a hard worker. Communication was also very good with him and he was very responsive all the time, something not easy to find in many freelancers. We'll definitely repeat with him.",
  },
  {
    name: "Renee Sims",
    position: "Receptionist",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "This guy does everything he can to get the job done and done right. This is the second time I've hired him, and I'll hire him again in the future.",
  },
  {
    name: "Jonathan Nunfiez",
    position: "Graphic Designer",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    text: "I had my concerns that due to a tight deadline this project can't be done. But this guy proved me wrong not only he delivered an outstanding work but he managed to deliver 1 day prior to the deadline. And when I asked for some revisions he made them in MINUTES. I'm looking forward to work with him again and I totally recommend him. Thanks again!",
  },
  {
    name: "Sasha Ho",
    position: "Accountant",
    photo:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350auto=compress&cs=tinysrgb",
    text: "This guy is a top notch designer and front end developer. He communicates well, works fast and produces quality work. We have been lucky to work with him!",
  },
  {
    name: "Veeti Seppanen",
    position: "Director",
    photo: "https://randomuser.me/api/portraits/men/97.jpg",
    text: "This guy is a young and talented IT professional, proactive and responsible, with a strong work ethic. He is very strong in PSD2HTML conversions and HTML/CSS technology. He is a quick learner, eager to learn new technologies. He is focused and has the good dynamics to achieve due dates and outstanding results.",
  },
];

// Dynamically Load the First Testimonial
let index = 0;

const updateTestimonial = () => {
  // Add Fade-In and Fade-Out Transitions
  testimonialContainer.classList.toggle("show", false);
  testimonialContainer.classList.toggle("hide", true);
  setTimeout(() => {
    const { name, position, photo, text } = testimonials[index];
    testimonial.innerHTML = text;
    userImage.src = photo;
    username.innerHTML = name;
    role.innerHTML = position;
    index++;
    if (index > testimonials.length - 1) index = 0;
    testimonialContainer.classList.toggle("hide", false);
    testimonialContainer.classList.toggle("show", true);
  }, 300);
};

// Pause on Hover
// let interval = setInterval(updateTestimonial, 10000);

// Synchronize Progress Bar on Pause/Resume
let startTime = Date.now();
let interval;
let elapsedBeforePause = 0;

const startTestimonialCycle = () => {
  updateTestimonial();
  progressBar.classList.remove("animate");
  void progressBar.offsetWidth;
  progressBar.classList.add("animate");
  startTime = Date.now();
  interval = setTimeout(startTestimonialCycle, 10000);
};

testimonialContainer.addEventListener("mouseenter", () => {
  // clearInterval(interval);
  clearTimeout(interval);
  elapsedBeforePause = Date.now() - startTime;
  progressBar.style.animationPlayState = "paused";
});

testimonialContainer.addEventListener("mouseleave", () => {
  // setInterval(updateTestimonial, 10000);
  const remainingTime = 10000 - elapsedBeforePause;
  progressBar.style.animationPlayState = "running";
  interval = setTimeout(startTestimonialCycle, remainingTime);
  startTime = Date.now() - elapsedBeforePause;
});

startTestimonialCycle();
