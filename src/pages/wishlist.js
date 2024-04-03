import WishlistModal from "@/components/Shared/WishlistModal";

const WishlistPage = () => {
  return (
    <div>
      <WishlistModal open={true} close={() => {}} relative />
    </div>
  );
};
export default WishlistPage;
