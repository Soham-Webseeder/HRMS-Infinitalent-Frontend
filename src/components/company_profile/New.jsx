export default function New() {
  return (
    <>
      <div className="flex  justify-center w-full">
        <div className="flex flex-col md:flex-row border p-4 w-3/4 ">
          <div className="w-full md:w-2/3 p-4">
            <h2 className="text-xl font-semibold mb-4">
              Purpose of connecting with us?
            </h2>
            <div className="flex mb-4">
              <label className="flex items-center mr-4 px-4  border-violet-500 border-2 rounded-full">
                <input
                  type="radio"
                  name="purpose"
                  className="mr-2"
                  defaultChecked
                />
                <span className="p-2">Contact Us</span>
              </label>
              <label className="flex items-center  mr-4 px-4  border-gray-300 border-2 rounded-full">
                <input type="radio" name="purpose" className="mr-2" />
                <span>Partnership</span>
              </label>
            </div>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Email</label>
                  <div className="flex items-center border p-2 rounded">
                    <img
                      src="https://placehold.co/20x20"
                      alt="flag"
                      className="mr-2"
                    />
                    <input type="text" placeholder="+91" className="flex-1" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Brand Name</label>
                  <input
                    type="text"
                    placeholder="Brand Name"
                    className="border p-2 rounded"
                  />
                </div>
              </div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Work Email"
                className="border p-2 rounded w-full mb-4"
              />
              <div className="flex flex-col">
                <label htmlFor="">Message</label>
                <textarea
                  placeholder="Your message for us"
                  className="border p-2 rounded w-full mb-4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                Submit Request
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/3 p-4 border-l">
            <h2 className="text-xl font-semibold mb-4">Need help & Support?</h2>
            <p className="mb-4">
              If you are an existing customer of supplyprint then you can raise
              your concern directly by creating support ticket. For this you
              just need to click on the below button.
            </p>
            <button className="border p-2 rounded w-full">
              Raise New Ticket
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
