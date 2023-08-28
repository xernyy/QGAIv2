import Navbar from '../src/components/navbar';
import Container from '../src/components/container';
import Head from 'next/head';
import FeatureCard from '../src/components/featureCard';
import Footer from '../src/components/footer';


export default function Dashboard() {

  return(
    <>
      <Head>
        <title>Sage AI- Acquisition, Understanding, Application, Adaptation</title>
          <meta
            name="description"
            content="Sage Ai: Guiding Your Journey from Knowledge to Mastery"
          />
        <link rel="icon" href="/img/logo.png" />
      </Head>
      
      <Navbar/>

      <Container className="flex flex-wrap   h-screen">
        <div className='w-full flex justify-center'>
        <div className="w-3/4  ">
        <h1 className='text-3xl text-gray-500 font-bold '>Your Dashboard</h1>
          <FeatureCard imageSrc={'/img/study.png'} href={''} name={'Practice Questions'} description={'Practice and reinforce key concepts with customized problems. Our platform offers a seamless experience, allowing you to solve problems, receive instant feedback, and utilize integrated tools to make answering as fluid as possible.'}/>
          <FeatureCard imageSrc={'/img/manage.png'} href={''} name={'Course Manager'} description={'Customize your learning journey by adding/removing courses and uploading materials like past papers. These resources boost learning and refine AI algorithms to provide relevant content for your unique learning path.'}/>
          <FeatureCard imageSrc={'/img/learning.png'} href={''} name={'Learning Path'}description={'By tailoring to your study schedule and course preferences, our AI-driven platform guides you towards mastery. Enjoy scheduled study guides enriched with accurate and robust content, and engage in immediate practice aligned with the material. '}/>
          <FeatureCard imageSrc={'/img/equation.png'} href={''} name={'Equation Solver'} description={'Simplify complex mathematical problems effortlessly with our advanced equation solver. Whether you are dealing with algebraic, trigonometric, or calculus equations, our tool provides step-by-step solutions to help you grasp the concepts better.'}/>
          <FeatureCard imageSrc={'/img/calendar.png'} href={''} name={'Your Schedule'}description={'Take control of your time with our integrated scheduling tool. Combat procrastination by managing your school and study timetables all in one place. Stay organized and on track with reminders and alerts.'}/>
          
        </div>
        <div>
        </div>
      </div>
      <div><Footer/></div> 
      </Container>
      
      
    </>

  );
  // Render your dashboard content here
}
