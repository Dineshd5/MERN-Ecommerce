import { assets } from "../assets/assets";
import NewLetterBox from "../components/NewLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t ">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
            assumenda quod! Ipsum vitae vel repellat reiciendis quibusdam odit
            hic commodi illum natus harum. Labore, ex consequatur! Mollitia
            dignissimos voluptatem voluptatum!{" "}
          </p>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            quibusdam reprehenderit molestiae quis, vitae consectetur incidunt
            doloribus? Mollitia quaerat tenetur temporibus sint vel, nam a dicta
            quis dignissimos praesentium optio?{" "}
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            modi saepe fugiat est in, dolorum ipsum autem minus commodi dicta
            distinctio sequi? Esse aliquam vitae soluta cum voluptas, maiores
            cumque!
          </p>
        </div>
      </div>
      <div className="text-xl py-4 ">
        <Title text1={"WHY "} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border  border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality assurance :</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            aspernatur veritatis soluta qui ipsum culpa quibusdam, vero ea ullam
            enim veniam mollitia.
          </p>
        </div>
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience :</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            aspernatur veritatis soluta qui ipsum culpa quibusdam, vero ea ullam
            enim veniam mollitia, modi quos quidem delectus molestiae. Quod,
            exercitationem dolorum!
          </p>
        </div>
        <div className="border border-gray-400 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service : </b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            aspernatur veritatis soluta qui ipsum culpa quibusdam, vero ea ullam
            enim veniam mollitia, modi quos quidem delectus molestiae. Quod,
            exercitationem dolorum!
          </p>
        </div>
      </div>
      <NewLetterBox />
    </div>
  );
};

export default About;
