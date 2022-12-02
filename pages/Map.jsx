import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import beehive from "../public/img/beehive.png"; // Import using relative path


const Map = () => {
    const [markets, setMarkets] = useState(null);
    const hqIcon = L.icon({
        className: "mkt-icon",
        iconUrl: "img/beehive.png",
        iconSize: [25, 25],
        iconAnchor: [25, 0],
        title: "Marketplace",
        // ref: { divRef },
      });
    // const body = {

    // }
  useEffect(() => {
    fetch("https://scapi.truckertools.com/broker/markets?start=12/01/2022&end=12/03/2022"
    ,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InMwdHc3azF2Mlc0enRQR2xoVlhsRSJ9.eyJodHRwczovL2F1dGgudHJ1Y2tlcnRvb2xzLmNvbWFwcF9tZXRhZGF0YSI6eyJpZCI6MTc1Mzc3LCJhY2NvdW50cyI6W3siYWNjb3VudFR5cGUiOiJicm9rZXIiLCJjdXN0b21lckFjY291bnRJZCI6MjgsInJvbGVzIjpbInVzZXIiXSwiY29tcGFueU5hbWUiOiJSZWVkIFRyYW5zcG9ydCBTZXJ2aWNlcywgSW5jLiIsIm1jIjoiTUMzMDkyMDQiLCJkb3QiOiIiLCJicm9rZXJJZCI6IjExMDUiLCJleHRlcm5hbElkIjpudWxsLCJzZXJ2aWNlcyI6eyJib29rSXROb3ciOnRydWUsImZ1ZWwiOnsiaGFzU2VydmljZSI6ZmFsc2UsImNsaWVudEtleSI6bnVsbH0sImZhY3RvciI6eyJoYXNTZXJ2aWNlIjpmYWxzZSwiY2xpZW50S2V5IjpudWxsfSwiYWRkQ2FwYWNpdHkiOnRydWUsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJERk0iOnsiY2FycmllcklkIjpudWxsLCJyb2xlIjoidXNlciIsImNvbXBhbnlOYW1lIjoiUmVlZCBUcmFuc3BvcnQgU2VydmljZXMsIEluYy4iLCJ0dGwiOjE4MDAsImNyZWF0ZWQiOiIyMDIyLTEyLTAxIDIzOjIwOjMzIiwidXNlclR5cGUiOiJicm9rZXIiLCJyZWdpc3RyYXRpb25Db25maXJtZWQiOnRydWUsInVuc2Vlbk5vdGlmaWNhdGlvbnMiOjAsIm5lZWRDcmVkaXRDYXJkIjpmYWxzZSwiYWNjb3VudFN0YXR1cyI6IkxJVkUiLCJwdXNoZXJBcHBLZXkiOiJiZTMzMjRjYWY3ZDE5NGVhNmVhYyIsInNob3dQdWJsaXNoVG9DYXJyaWVycyI6ZmFsc2UsInNob3dQYXltZW50IjpmYWxzZSwiaXNUTVMiOnRydWUsInRtc1N0YXR1cyI6bnVsbCwiYWRkQ2FwYWNpdHkiOnRydWUsInNob3dTaGlwcGVySW5mbyI6ZmFsc2UsImxvZ2lzdGljYWxMYWJUb2tlbiI6bnVsbCwibG9naXN0aWNhbExhYkRvbWFpbiI6bnVsbCwiZnVlbFBvcnRhbCI6ZmFsc2UsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJoaWRlUGhvbmVJY29uIjpmYWxzZSwic2hvd1JldmVudWUiOnRydWUsImhhc0NhcnJpZXJQYWNrZXRzIjpmYWxzZSwiaGFzTG9hZHRyYWNrRGFzaGJvYXJkIjowLCJib29rSXROb3dSYXRlS2V5IjoidGFyZ2V0X21pbmltdW1fcGF5Iiwic2Vjb25kYXJ5Ym9va0l0Tm93UmF0ZUtleSI6bnVsbCwiYm9va0l0Tm93UmF0ZUFkanVzdG1lbnQiOm51bGwsImhhc0Z1c2VCaWxsQWNjb3VudCI6dHJ1ZSwiaXNGdXNlQmlsbEV4cGlyZWQiOmZhbHNlLCJmdXNlQmlsbEV4cGlyZURhdGUiOiIyMDIyLTEyLTAxIiwibWNOdW1iZXIiOiJNQzMwOTIwNCIsImN1c3RvbWVyQWNjb3VudElkIjoyOCwiY2FuQ29ubmVjdFRvUHVzaGVyIjp0cnVlLCJwdXNoZXJDbHVzdGVyIjoibXQxIiwiYnJva2VyTG9hZENvbnRhY3RQaCI6IjgxMzM2OTY1MDAiLCJicm9rZXJMb2FkQ29udGFjdEVtYWlsIjoiVHJ1Y2tlclRvb2xPZmZlcnNAUmVlZFRNUy5jb20iLCJzaG93Um91dGVDYXJyaWVycyI6ZmFsc2UsImhhc0xvYWRzdXJlIjoxLCJoYXNQdWJsaXNoVG9DYXJyaWVyIjp0cnVlLCJzaG93Q2FycmllckFjdGl2aXR5VGFiIjp0cnVlLCJjYW5Db3ZlckFuZFRyYWNrTG9hZCI6ZmFsc2V9fX1dLCJmaXJzdE5hbWUiOiJTYXNoYSIsImxhc3ROYW1lIjoiR3JpZXIiLCJ1c2VyRW1haWwiOiJzZ3JpZXJAcmVlZHRtcy5jb20iLCJwaG9uZU51bWJlciI6Iig4MTMpIDM2OS02NDE1In0sImlzcyI6Imh0dHBzOi8vYXV0aC50cnVja2VydG9vbHMuY29tLyIsInN1YiI6ImF1dGgwfDE3NTM3NyIsImF1ZCI6WyJodHRwczovL2FwaS50cnVja2VydG9vbHMuY29tIiwiaHR0cHM6Ly90cnVja2VydG9vbHMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY2OTk1NDgzMywiZXhwIjoxNjcwMDQxMjMzLCJhenAiOiIxa1h3emJSRWVFRVplRWJ5ZUFnUGJRVXF2TTN3T1B6eCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.lKvWzpIVyh3oHho-aebL3NFW6vaSlzgqlYGx19WQaIGqTfCizMBZatH55QfPslCRc-9xt3MGOQ3RDcHx50a_J9jD0sHlXYRcmzDQD_dp66VqwOrwbSFIQdrdqmi0CA-JgRmZYqMWVsVKG2hePq8mjpW1_yIrkF-VAijSODTwe5XgAGsm713DmP5G82r5cY0VuhzpfPraLKcZFQ2gmlf6wmDuMk1m-DkKxE8Y6qz3SlI5FaLERRfXxO2csT-IRM8c6vkRNbp3a1thuEHesx5CxDn7_J2RjQUU50YQQFkz2AmEsxwyNg3O4Y2mMsKE6rW7TDa2wtTXzkAOS2oB91kjBA","id_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InMwdHc3azF2Mlc0enRQR2xoVlhsRSJ9.eyJodHRwczovL2F1dGgudHJ1Y2tlcnRvb2xzLmNvbWFwcF9tZXRhZGF0YSI6eyJpZCI6MTc1Mzc3LCJhY2NvdW50cyI6W3siYWNjb3VudFR5cGUiOiJicm9rZXIiLCJjdXN0b21lckFjY291bnRJZCI6MjgsInJvbGVzIjpbInVzZXIiXSwiY29tcGFueU5hbWUiOiJSZWVkIFRyYW5zcG9ydCBTZXJ2aWNlcywgSW5jLiIsIm1jIjoiTUMzMDkyMDQiLCJkb3QiOiIiLCJicm9rZXJJZCI6IjExMDUiLCJleHRlcm5hbElkIjpudWxsLCJzZXJ2aWNlcyI6eyJib29rSXROb3ciOnRydWUsImZ1ZWwiOnsiaGFzU2VydmljZSI6ZmFsc2UsImNsaWVudEtleSI6bnVsbH0sImZhY3RvciI6eyJoYXNTZXJ2aWNlIjpmYWxzZSwiY2xpZW50S2V5IjpudWxsfSwiYWRkQ2FwYWNpdHkiOnRydWUsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJERk0iOnsiY2FycmllcklkIjpudWxsLCJyb2xlIjoidXNlciIsImNvbXBhbnlOYW1lIjoiUmVlZCBUcmFuc3BvcnQgU2VydmljZXMsIEluYy4iLCJ0dGwiOjE4MDAsImNyZWF0ZWQiOiIyMDIyLTEyLTAxIDIzOjIwOjMzIiwidXNlclR5cGUiOiJicm9rZXIiLCJyZWdpc3RyYXRpb25Db25maXJtZWQiOnRydWUsInVuc2Vlbk5vdGlmaWNhdGlvbnMiOjAsIm5lZWRDcmVkaXRDYXJkIjpmYWxzZSwiYWNjb3VudFN0YXR1cyI6IkxJVkUiLCJwdXNoZXJBcHBLZXkiOiJiZTMzMjRjYWY3ZDE5NGVhNmVhYyIsInNob3dQdWJsaXNoVG9DYXJyaWVycyI6ZmFsc2UsInNob3dQYXltZW50IjpmYWxzZSwiaXNUTVMiOnRydWUsInRtc1N0YXR1cyI6bnVsbCwiYWRkQ2FwYWNpdHkiOnRydWUsInNob3dTaGlwcGVySW5mbyI6ZmFsc2UsImxvZ2lzdGljYWxMYWJUb2tlbiI6bnVsbCwibG9naXN0aWNhbExhYkRvbWFpbiI6bnVsbCwiZnVlbFBvcnRhbCI6ZmFsc2UsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJoaWRlUGhvbmVJY29uIjpmYWxzZSwic2hvd1JldmVudWUiOnRydWUsImhhc0NhcnJpZXJQYWNrZXRzIjpmYWxzZSwiaGFzTG9hZHRyYWNrRGFzaGJvYXJkIjowLCJib29rSXROb3dSYXRlS2V5IjoidGFyZ2V0X21pbmltdW1fcGF5Iiwic2Vjb25kYXJ5Ym9va0l0Tm93UmF0ZUtleSI6bnVsbCwiYm9va0l0Tm93UmF0ZUFkanVzdG1lbnQiOm51bGwsImhhc0Z1c2VCaWxsQWNjb3VudCI6dHJ1ZSwiaXNGdXNlQmlsbEV4cGlyZWQiOmZhbHNlLCJmdXNlQmlsbEV4cGlyZURhdGUiOiIyMDIyLTEyLTAxIiwibWNOdW1iZXIiOiJNQzMwOTIwNCIsImN1c3RvbWVyQWNjb3VudElkIjoyOCwiY2FuQ29ubmVjdFRvUHVzaGVyIjp0cnVlLCJwdXNoZXJDbHVzdGVyIjoibXQxIiwiYnJva2VyTG9hZENvbnRhY3RQaCI6IjgxMzM2OTY1MDAiLCJicm9rZXJMb2FkQ29udGFjdEVtYWlsIjoiVHJ1Y2tlclRvb2xPZmZlcnNAUmVlZFRNUy5jb20iLCJzaG93Um91dGVDYXJyaWVycyI6ZmFsc2UsImhhc0xvYWRzdXJlIjoxLCJoYXNQdWJsaXNoVG9DYXJyaWVyIjp0cnVlLCJzaG93Q2FycmllckFjdGl2aXR5VGFiIjp0cnVlLCJjYW5Db3ZlckFuZFRyYWNrTG9hZCI6ZmFsc2V9fX1dLCJmaXJzdE5hbWUiOiJTYXNoYSIsImxhc3ROYW1lIjoiR3JpZXIiLCJ1c2VyRW1haWwiOiJzZ3JpZXJAcmVlZHRtcy5jb20iLCJwaG9uZU51bWJlciI6Iig4MTMpIDM2OS02NDE1In0sImZhbWlseV9uYW1lIjoiR3JpZXIiLCJuaWNrbmFtZSI6InNncmllciIsIm5hbWUiOiJTYXNoYSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9iODJjMDBiZTliYjY0ODQzZjUyNjQ4M2UyY2Y0NmExMD9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRnNhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIyLTExLTI5VDE4OjM5OjE0LjMzMVoiLCJlbWFpbCI6InNncmllckByZWVkdG1zLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2F1dGgudHJ1Y2tlcnRvb2xzLmNvbS8iLCJzdWIiOiJhdXRoMHwxNzUzNzciLCJhdWQiOiIxa1h3emJSRWVFRVplRWJ5ZUFnUGJRVXF2TTN3T1B6eCIsImlhdCI6MTY2OTk1NDgzMywiZXhwIjoxNjY5OTkwODMzLCJzaWQiOiJXVndKYm94a1VQa2dMOWI5SHpiTHlXZHJvRzdGT2dGbCIsIm5vbmNlIjoiTm1WemRIWjBVa1kwU1VGMFpteFVmbTVSWkhnNFdsZzFRa2g0Tm5wUFZWbDNOelpKUkc5U2FIRm5NUT09In0.qCfI-IDqvZixdv6JGc0fiSEstrmrWKg242CkWM0fxySqdq-wOwYLK8UB9DEoChrWmB0OWtTcnL4sgbFbwTzwpz0JFNLmqAod7SZJLkbTnUmjOeM5B0Xyrdi9p0cpTUb142FLuZeuTKNgRytg-3ZtKWsbcWzXznVhI3pzFcXKTZ4lYnIxnKSOevp8hvkvSHPUy0WQ7rzKCCoU1jDi2wGT6ca2afIEdICWI0DWV_VHcwdwHeuspkqief9WTRYRx6mP34cPW4UyhNMKSLlDLwOR8k25ELJyqanv6vMc_WPXZ3CApbDDG9FXiFf9c6fODMuhgU77-whF4CEDBKl3e4TlQg",
      },
    }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMarkets(data);
      });
    //   return () => {
    //   }
  }, []);

  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
    url='https://tile.jawg.io/a774b0e4-e02c-422c-9d25-e1d7162d18f1/{z}/{x}/{y}{r}.png?access-token=l96twR2s0qOqqgNxWwS7LQ2zuwwSw5SXCM9WipAB8DHKM2DOxfsHTuUU0y33BN60'
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>HiveEngine | OpenStreetMap</a> Spencer Grier"
  />
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">HiveEngine | OpenStreetMap</a> Spencer Grier'
      /> */}
      {/* <TileLayer
    url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png'
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>HiveEngine | OpenStreetMap</a> Spencer Grier"
  /> */}
  {markets?.marketAreas?.map((market) => {
    if(market.lat && market.lon) {
    return (
        <Marker
          key={market?.id}
            position={[market?.lat, market?.lon]}
            icon={hqIcon}
            >
            <Popup>
                <div>
                    <h3>{market?.name}</h3>
                    <p>{market?.pickupAddress}</p>
                    <p>{market?.market_trucks_count}T : {market?.market_loads_count}L</p>
                </div>
            </Popup>
        </Marker>
    )}})}
      {/* <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
        <Popup>Hey ! you found me</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
