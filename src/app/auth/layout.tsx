'use client';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          autoClose={3500}
          position={'top-right'}
          hideProgressBar
          transition={Slide}
          limit={3}
        />
        <div className="flex justify-center items-center w-screen h-screen bg-white">
          <div className="container mx-auto my-4 px-8 xl:px-48">
            <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
              {children}
            </div>

            <div className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
              <div className="flex flex-col text-white">
                <h1 className="font-bold uppercase text-4xl my-4">
                  Drop in our office
                </h1>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam tincidunt arcu diam, eu feugiat felis fermentum id.
                  Curabitur vitae nibh viverra, auctor turpis sed, scelerisque
                  ex.
                </p>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl">Main Office</h2>
                    <p className="text-gray-400">
                      5555 Tailwind RD, Pleasant Grove, UT 73533
                    </p>
                  </div>
                </div>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <div className="flex flex-col">
                    <i className="fas fa-phone-alt pt-2 pr-2" />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-2xl">Call Us</h2>
                    <p className="text-gray-400">Tel: xxx-xxx-xxx</p>
                    <p className="text-gray-400">Fax: xxx-xxx-xxx</p>
                  </div>
                </div>

                <div className="flex my-4 w-2/3 lg:w-1/2">
                  <a
                    href="https://www.facebook.com/ENLIGHTENEERING/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                  >
                    <i className="fab fa-facebook-f text-blue-900" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/enlighteneering-inc-"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white h-8 w-8 inline-block mx-1 text-center pt-1"
                  >
                    <i className="fab fa-linkedin-in text-blue-900" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
