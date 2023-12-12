interface CardProps {
  title: string;
  content: string;
  onBtnClick: () => void;
}

const RestaurantCard = ({ title, content, onBtnClick }: CardProps) => {
  return (
    <div className="block rounded-lg w-80 bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
        {title}
      </h5>
      <p className="mb-4 text-base text-neutral-600 ">{content}</p>
      <button
        type="button"
        className="inline-block rounded bg-gray-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
        data-te-ripple-init
        data-te-ripple-color="light"
        onClick={onBtnClick}
      >
        Button
      </button>
    </div>
  );
};

export default RestaurantCard;
