import { Spinner } from "@nextui-org/react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import Loader from "./Loader";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCCGghgOEG3d9HAF1UXIj5P9PBeQ_gvxls",
  });

   // Mirpur-13, Dhaka, Bangladesh coordinates
   const center = { lat: 43.0001985, lng: -81.1957623 };
 

  if (!isLoaded) return <Loader className={"h-full"}/>

  return (
    <GoogleMap
      zoom={18}
      center={center}
      mapContainerClassName="map"
      mapContainerStyle={{ width: "100%", height: "75%", margin: "auto" }}
    />

  );
};

export default Map;