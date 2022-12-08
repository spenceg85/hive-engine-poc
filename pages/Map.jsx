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
  function expandContract(e) {
    
    e.target.openPopup()
    
    setTimeout(() => {
      const el = document.getElementById("expand-contract");
      console.log(el.classList)
      if(el.classList.contains("collapsed")) {
        el.classList.toggle("expanded");
      } else if(el.classList.contains("expanded")) {
        el.classList.toggle("collapsed");
      }
    }, 200);
  }
  // const body = {

  // }
  useEffect(() => {
    fetch(
      "https://scapi.truckertools.com/broker/markets?start=12/01/2022&end=12/03/2022",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InMwdHc3azF2Mlc0enRQR2xoVlhsRSJ9.eyJodHRwczovL2F1dGgudHJ1Y2tlcnRvb2xzLmNvbWFwcF9tZXRhZGF0YSI6eyJpZCI6MTc1Mzc3LCJhY2NvdW50cyI6W3siYWNjb3VudFR5cGUiOiJicm9rZXIiLCJjdXN0b21lckFjY291bnRJZCI6MjgsInJvbGVzIjpbInVzZXIiXSwiY29tcGFueU5hbWUiOiJSZWVkIFRyYW5zcG9ydCBTZXJ2aWNlcywgSW5jLiIsIm1jIjoiTUMzMDkyMDQiLCJkb3QiOiIiLCJicm9rZXJJZCI6IjExMDUiLCJleHRlcm5hbElkIjpudWxsLCJzZXJ2aWNlcyI6eyJib29rSXROb3ciOnRydWUsImZ1ZWwiOnsiaGFzU2VydmljZSI6ZmFsc2UsImNsaWVudEtleSI6bnVsbH0sImZhY3RvciI6eyJoYXNTZXJ2aWNlIjpmYWxzZSwiY2xpZW50S2V5IjpudWxsfSwiYWRkQ2FwYWNpdHkiOnRydWUsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJERk0iOnsiY2FycmllcklkIjpudWxsLCJyb2xlIjoidXNlciIsImNvbXBhbnlOYW1lIjoiUmVlZCBUcmFuc3BvcnQgU2VydmljZXMsIEluYy4iLCJ0dGwiOjE4MDAsImNyZWF0ZWQiOiIyMDIyLTEyLTAyIDE3OjU4OjE5IiwidXNlclR5cGUiOiJicm9rZXIiLCJyZWdpc3RyYXRpb25Db25maXJtZWQiOnRydWUsInVuc2Vlbk5vdGlmaWNhdGlvbnMiOjAsIm5lZWRDcmVkaXRDYXJkIjpmYWxzZSwiYWNjb3VudFN0YXR1cyI6IkxJVkUiLCJwdXNoZXJBcHBLZXkiOiJiZTMzMjRjYWY3ZDE5NGVhNmVhYyIsInNob3dQdWJsaXNoVG9DYXJyaWVycyI6ZmFsc2UsInNob3dQYXltZW50IjpmYWxzZSwiaXNUTVMiOnRydWUsInRtc1N0YXR1cyI6bnVsbCwiYWRkQ2FwYWNpdHkiOnRydWUsInNob3dTaGlwcGVySW5mbyI6ZmFsc2UsImxvZ2lzdGljYWxMYWJUb2tlbiI6bnVsbCwibG9naXN0aWNhbExhYkRvbWFpbiI6bnVsbCwiZnVlbFBvcnRhbCI6ZmFsc2UsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJoaWRlUGhvbmVJY29uIjpmYWxzZSwic2hvd1JldmVudWUiOnRydWUsImhhc0NhcnJpZXJQYWNrZXRzIjpmYWxzZSwiaGFzTG9hZHRyYWNrRGFzaGJvYXJkIjowLCJib29rSXROb3dSYXRlS2V5IjoidGFyZ2V0X21pbmltdW1fcGF5Iiwic2Vjb25kYXJ5Ym9va0l0Tm93UmF0ZUtleSI6bnVsbCwiYm9va0l0Tm93UmF0ZUFkanVzdG1lbnQiOm51bGwsImhhc0Z1c2VCaWxsQWNjb3VudCI6dHJ1ZSwiaXNGdXNlQmlsbEV4cGlyZWQiOmZhbHNlLCJmdXNlQmlsbEV4cGlyZURhdGUiOiIyMDIyLTEyLTAyIiwibWNOdW1iZXIiOiJNQzMwOTIwNCIsImN1c3RvbWVyQWNjb3VudElkIjoyOCwiY2FuQ29ubmVjdFRvUHVzaGVyIjp0cnVlLCJwdXNoZXJDbHVzdGVyIjoibXQxIiwiYnJva2VyTG9hZENvbnRhY3RQaCI6IjgxMzM2OTY1MDAiLCJicm9rZXJMb2FkQ29udGFjdEVtYWlsIjoiVHJ1Y2tlclRvb2xPZmZlcnNAUmVlZFRNUy5jb20iLCJzaG93Um91dGVDYXJyaWVycyI6ZmFsc2UsImhhc0xvYWRzdXJlIjoxLCJoYXNQdWJsaXNoVG9DYXJyaWVyIjp0cnVlLCJzaG93Q2FycmllckFjdGl2aXR5VGFiIjp0cnVlLCJjYW5Db3ZlckFuZFRyYWNrTG9hZCI6ZmFsc2V9fX1dLCJmaXJzdE5hbWUiOiJTYXNoYSIsImxhc3ROYW1lIjoiR3JpZXIiLCJ1c2VyRW1haWwiOiJzZ3JpZXJAcmVlZHRtcy5jb20iLCJwaG9uZU51bWJlciI6Iig4MTMpIDM2OS02NDE1In0sImlzcyI6Imh0dHBzOi8vYXV0aC50cnVja2VydG9vbHMuY29tLyIsInN1YiI6ImF1dGgwfDE3NTM3NyIsImF1ZCI6WyJodHRwczovL2FwaS50cnVja2VydG9vbHMuY29tIiwiaHR0cHM6Ly90cnVja2VydG9vbHMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3MDAyMTkwMCwiZXhwIjoxNjcwMTA4MzAwLCJhenAiOiIxa1h3emJSRWVFRVplRWJ5ZUFnUGJRVXF2TTN3T1B6eCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.TpvooNAkV__c-8otERFfi4kp7QLMQ6cNja_AuuRYFfV5uPILDLGj7xORSyopZshb0AzDF8JXUnpKycVf-OCnkd0VBZmzTY_i9BvjT5Su-BxAUkxoiuzlnb5i2nwdX-zQVZvL314LMbAVbMn9g47eZqOYPU0E10a9IbVv6Gq7KoDHoDKuAyTEAlngIknPqXugpPKobAGygkgLULlQetqxvMY55asR1QKkiZX_RACpGkekh4lmXcImUTHxcgVLRQowpstY9vOpCbDRDsofbN6_U9oShIShMt4J7pYUXnM4MF9U14Dk1OrnHRc_ayL33En-CU8yH4sAhLVrOVDIcLR9GQ",
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
      {/* <TileLayer
        url="https://tile.jawg.io/a774b0e4-e02c-422c-9d25-e1d7162d18f1/{z}/{x}/{y}{r}.png?access-token=l96twR2s0qOqqgNxWwS7LQ2zuwwSw5SXCM9WipAB8DHKM2DOxfsHTuUU0y33BN60"
        attribution='&copy; <a href="http://osm.org/copyright">HiveEngine | OpenStreetMap</a> Spencer Grier'
      /> */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">HiveEngine | OpenStreetMap</a> Spencer Grier'
      />
      {/* <TileLayer
    url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png'
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>HiveEngine | OpenStreetMap</a> Spencer Grier"
  /> */}
      {markets?.marketAreas?.map((market) => {
        if (market.lat && market.lon) {
          return (
            <Marker
              key={market?.id}
              position={[market?.lat, market?.lon]}
              icon={hqIcon}
              eventHandlers={{
                mouseover: (event) => expandContract(event),
              }}
            >
              <Popup>
                {/* <div id="container"> */}
                  <div id="expand-container">
                    <div id="expand-contract" className="collapsed">
                      {/* This section expands and contracts */}
                      {/* <div> */}
                      <h3>{market?.name}</h3>
                      <div style={{width: "120%", position: "absolute", left: "0px", height: "30px", background: "#fda504"}}></div>
                  
                  
                  <p>{market?.pickupAddress}</p>
                  <div style={{width: "120%", position: "absolute", left: "0px", height: "30px", background: "#fda504"}}></div>
                  <p>
                    {market?.market_trucks_count}T :{" "}
                    {market?.market_loads_count}L
                  </p>
                  {/* <div class="drop"></div>
                  <div class="menu">
					<div class="menu-wrapper">
						<ul class="menu-items">
							<li class="menu-item">
								<button class="menu-item-button">
									<i class="menu-item-icon icon icon-reply"></i>
								</button>
								<div class="menu-item-bounce"></div>
							</li>
							<li class="menu-item">
								<button class="menu-item-button">
									<i class="menu-item-icon icon icon-box"></i>
								</button>
								<div class="menu-item-bounce"></div>
							</li>
							<li class="menu-item">
								<button class="menu-item-button">
									<i class="menu-item-icon icon icon-trash"></i>
								</button>
								<div class="menu-item-bounce"></div>
							</li>
						</ul>
						<button class="menu-toggle-button">
							<i class="fa fa-plus menu-toggle-icon"></i>
						</button>
					</div>
				</div> */}
                  {/* <div class="grid">
		<div class="block">1</div>
		<div class="block">2</div>
		<div class="block">3</div>
		<div class="block">4</div>
		<div class="block">5</div>
		<div class="block">6</div>
		<div class="block">7</div>
		<div class="block">8</div>
		<div class="block">9</div>
		<div class="block">10</div>

		
	</div> */}
                {/* </div> */}
                    </div>
                  </div>
                {/* </div> */}
                {/* <button onClick={expandContract}>Expand/Contract</button> */}
              </Popup>
            </Marker>
          );
        }
      })}
      {/* <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
        <Popup>Hey ! you found me</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
