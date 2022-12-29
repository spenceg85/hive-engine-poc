import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import beehive from "../public/img/beehive.png"; // Import using relative path
import Goo from "gooey-react";
import "fa-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  useInput,
  Row,
  Checkbox,
  Button,
  Text,
  Tooltip,
  Dropdown,
  Textarea,
  Loading,
  Table,
} from "@nextui-org/react";
import AsyncSelect from "react-select/async";
import Select from "react-select";

const Map = () => {
  const [selectedType, setSetSelectedType] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [availabilities, setAvailabilities] = useState(null);
  const [markets, setMarkets] = useState(null);
  const [visible, setVisible] = useState(false);
  const modalHandler = () => setVisible(true);
  const closeModalHandler = () => {
    setVisible(false);
  };
  const hqIcon = L.icon({
    className: "mkt-icon",
    iconUrl: "img/beehive.png",
    iconSize: [25, 25],
    iconAnchor: [25, 0],
    title: "Marketplace",
    // ref: { divRef },
  });
  const truckIcon = L.icon({
    className: "mkt-icon",
    iconUrl: "img/truckerBee.png",
    iconSize: [43, 33],
    iconAnchor: [25, 0],
    title: "Available Truck",
    // ref: { divRef },
  });
  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "mc",
      label: "MC",
    },
    {
      key: "eld",
      label: "ELD",
    },
    {
      key: "phone",
      label: "PHONE",
    },
    {
      key: "email",
      label: "EMAIL",
    },
    {
      key: "network",
      label: "REPUTATION",
    },
    {
      key: "market",
      label: "MARKET",
    },
    {
      key: "city",
      label: "CITY",
    },
    {
      key: "state",
      label: "STATE",
    },
    {
      key: "truck",
      label: "TRUCK",
    },
  ];

  const types = [
    { value: "all", label: "All" },
    { value: "reefer", label: "Reefer" },
    { value: "dry", label: "Dry" },
    { value: "flatbed", label: "Flatbed" },
    { value: "van", label: "Van" },
    { value: "auto carrier", label: "Auto Carrier" },
    { value: "power only", label: "Power Only" },
    { value: "53", label: "53" },
    { value: "cargo van team", label: "Cargo Van Team" },
    { value: "conestoga", label: "Conestoga" },
    { value: "container", label: "Container" },
    { value: "container insulated", label: "Container Insulated" },
    { value: "container refrigerated", label: "Container Refrigerated" },
    { value: "conveyor", label: "Conveyor" },
    { value: "double drop", label: "Double Drop" },
    { value: "drop deck landoll", label: "Drop Deck Landoll" },
    { value: "dry van", label: "Dry Van" },
    { value: "dump trailer", label: "Dump Trailer" },
    { value: "flatbed airride", label: "Flatbed Airride" },
    { value: "flatbed b-train", label: "Flatbed B-Train" },
    { value: "flatbed conestoga", label: "Flatbed Conestoga" },
    { value: "flatbed hazmat", label: "Flatbed Hazmat" },
    { value: "flatbed maxi", label: "Flatbed Maxi" },
    { value: "step-deck", label: "Step-Deck" },
    { value: "flatbed w/tarps", label: "Flatbed w/Tarps" },
    { value: "flatbed w/team", label: "Flatbed w/Team" },
    { value: "flatbed w/chains", label: "Flatbed w/Chains" },
    { value: "hopper bottom", label: "Hopper Bottom" },
    { value: "hotshot", label: "Hotshot" },
    { value: "insulated van or reefer", label: "Insulated Van or Reefer" },
    { value: "lowboy or rgn", label: "Lowboy Or RGN" },
    { value: "lowboy overdimension", label: "Lowboy Overdimension" },
    { value: "ltl", label: "LTL" },
    { value: "moving van", label: "Moving Van" },
    { value: "other", label: "Other" },
  ];

  // const filterColors = (inputValue) => {
  //   return colourOptions.filter((i) =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      const api = `https://nominatim.openstreetmap.org/search?format=geojson&limit=5&country=usa&city=${encodeURI(
        inputValue
      )}`;
      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          const options = [];
          data.features?.forEach((feature) => {
            const obj = {
              label: feature.properties?.display_name,
              value: feature.properties?.display_name,
              lat: feature.geometry?.coordinates[1],
              lon: feature.geometry?.coordinates[0],
              state: feature.properties?.display_name.split(", ")[2],
              truckTypes: types,
            };
            options.push(obj);
          });
          resolve(options);
        })
        .catch((error) => {
          console.error(error);
        });
      // setTimeout(() => {
      //   resolve(filterColors(inputValue));
      // }, 1000);
      // https://maps.googleapis.com/maps/api/place/js/AutocompletionService.GetPredictionsJson?1sflo&4sen-US&15e3&21m1&2e1&callback=_xdc_._9obgrz&key=AIzaSyCHpZ-d9yks6d8kpr-xAuMv6cDw021BF3g&token=51617
    });

  function expandContract(e) {
    e.target.openPopup();
    setTimeout(() => {
      const el = document.getElementById("expand-contract");
      if (el?.classList.contains("collapsed")) {
        el.classList.toggle("expanded");
      } else if (el?.classList.contains("expanded")) {
        el.classList.toggle("collapsed");
      }
    }, 200);
  }

  function formatDate(formatStr, date, opts) {
    if (!date) {
      date = new Date();
    }
    opts = opts || {};
    let _days = opts.days;
    if (!_days) {
      _days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }
    let _months = opts.months;
    if (!_months) {
      _months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    }
    const pad = (number, strDigits, isUnpad) => {
      const strNum = Math.abs(number).toString();
      if (!isUnpad && strNum.length > strDigits.length) {
        return strNum;
      } else {
        return ("0000" + strNum).slice(-strDigits.length);
      }
    };

    const timezone = (date, letter) => {
      const chunk = [];
      const offset = -date.getTimezoneOffset();
      chunk.push(offset === 0 ? "Z" : offset > 0 ? "+" : "-"); //add Z or +,-
      if (offset === 0) return chunk;
      chunk.push(pad(Math.floor(offset / 60), "00")); //hour
      if (letter === "X") return chunk.join("");
      if (letter === "XXX") chunk.push(":");
      chunk.push(pad(offset % 60, "00")); //min
      return chunk.join("");
    };

    const DELIM = "\0\0";
    const escapeStack = [];

    const escapedFmtStr = formatStr.replace(/'.*?'/g, (m) => {
      escapeStack.push(m.replace(/'/g, ""));
      return `${DELIM}${escapeStack.length - 1}${DELIM}`;
    });

    const formattedStr = escapedFmtStr
      .replace(/y{4}|y{2}/g, (m) => pad(date.getFullYear(), m, true))
      .replace(/M{3}/g, (m) => _months[date.getMonth()])
      .replace(/M{1,2}/g, (m) => pad(date.getMonth() + 1, m))
      .replace(/M{1,2}/g, (m) => pad(date.getMonth() + 1, m))
      .replace(/d{1,2}/g, (m) => pad(date.getDate(), m))
      .replace(/H{1,2}/g, (m) => pad(date.getHours(), m))
      .replace(/h{1,2}/g, (m) => {
        const hours = date.getHours();
        return pad(hours === 0 ? 12 : hours > 12 ? hours - 12 : hours, m);
      })
      .replace(/a{1,2}/g, (m) => (date.getHours() >= 12 ? "PM" : "AM"))
      .replace(/m{1,2}/g, (m) => pad(date.getMinutes(), m))
      .replace(/s{1,2}/g, (m) => pad(date.getSeconds(), m))
      .replace(/S{3}/g, (m) => pad(date.getMilliseconds(), m))
      .replace(/[E]+/g, (m) => _days[date.getDay()])
      .replace(/[Z]+/g, (m) => timezone(date, m))
      .replace(/X{1,3}/g, (m) => timezone(date, m));

    const unescapedStr = formattedStr.replace(
      new RegExp(`${DELIM}\\d+${DELIM}`, "g"),
      (m) => {
        const unescaped = escapeStack.shift();
        return unescaped.length > 0 ? unescaped : "'";
      }
    );

    return unescapedStr;
  }

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

  const getMarketDetails = (marketId, lat, lon, map) => {
    // console.log(marketId, lat, lon);

    // console.log(event.target.options.position);
    // const lat = event.target.options.position[0];
    // const lon = event.target.options.position[1];
    map.flyTo([lat, lon], 12);
    const date = new Date();
    const today = formatDate("MM/dd/yyyy", date);
    const ms = date.getTime() + 172800000;
    const twoDaysFromToday = new Date(ms);
    const twoDaysFromTodayFormatted = formatDate(
      "MM/dd/yyyy",
      twoDaysFromToday
    );
    console.log(lat, lon);
    fetch(
      `https://scapi.truckertools.com/broker/loads?&marketId=${marketId}&withAvailabilities=true&start=${today}&end=${twoDaysFromTodayFormatted}&highConfidenceOnly=true`,
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
        if (data.availabilities && data.availabilities.length > 0) {
          setAvailabilities(data.availabilities);
        }
        // setMarketDetails(data);
      });
  };

  const fetchCarriers = (selectedOption) => {
    setTableLoading(true);
    console.log(selectedOption);
    const req = {
      startDatetime: "12/28/2022",
      endDatetime: "12/30/2022",
      pickupLat: selectedOption.lat,
      pickupLon: selectedOption.lon,
      radius: 100,
      pickupState: selectedOption.state,
      truckTypes: selectedType,
    };
    fetch(`https://scapi.truckertools.com/broker/availabilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InMwdHc3azF2Mlc0enRQR2xoVlhsRSJ9.eyJodHRwczovL2F1dGgudHJ1Y2tlcnRvb2xzLmNvbWFwcF9tZXRhZGF0YSI6eyJpZCI6MTc1Mzc3LCJhY2NvdW50cyI6W3siYWNjb3VudFR5cGUiOiJicm9rZXIiLCJjdXN0b21lckFjY291bnRJZCI6MjgsInJvbGVzIjpbInVzZXIiXSwiY29tcGFueU5hbWUiOiJSZWVkIFRyYW5zcG9ydCBTZXJ2aWNlcywgSW5jLiIsIm1jIjoiTUMzMDkyMDQiLCJkb3QiOiIiLCJicm9rZXJJZCI6IjExMDUiLCJleHRlcm5hbElkIjpudWxsLCJzZXJ2aWNlcyI6eyJib29rSXROb3ciOnRydWUsImZ1ZWwiOnsiaGFzU2VydmljZSI6ZmFsc2UsImNsaWVudEtleSI6bnVsbH0sImZhY3RvciI6eyJoYXNTZXJ2aWNlIjpmYWxzZSwiY2xpZW50S2V5IjpudWxsfSwiYWRkQ2FwYWNpdHkiOnRydWUsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJERk0iOnsiY2FycmllcklkIjpudWxsLCJyb2xlIjoidXNlciIsImNvbXBhbnlOYW1lIjoiUmVlZCBUcmFuc3BvcnQgU2VydmljZXMsIEluYy4iLCJ0dGwiOjE4MDAsImNyZWF0ZWQiOiIyMDIyLTEyLTI4IDEzOjE0OjE0IiwidXNlclR5cGUiOiJicm9rZXIiLCJyZWdpc3RyYXRpb25Db25maXJtZWQiOnRydWUsInVuc2Vlbk5vdGlmaWNhdGlvbnMiOjAsIm5lZWRDcmVkaXRDYXJkIjpmYWxzZSwiYWNjb3VudFN0YXR1cyI6IkxJVkUiLCJwdXNoZXJBcHBLZXkiOiJiZTMzMjRjYWY3ZDE5NGVhNmVhYyIsInNob3dQdWJsaXNoVG9DYXJyaWVycyI6ZmFsc2UsInNob3dQYXltZW50IjpmYWxzZSwiaXNUTVMiOnRydWUsInRtc1N0YXR1cyI6bnVsbCwiYWRkQ2FwYWNpdHkiOnRydWUsInNob3dTaGlwcGVySW5mbyI6ZmFsc2UsImxvZ2lzdGljYWxMYWJUb2tlbiI6bnVsbCwibG9naXN0aWNhbExhYkRvbWFpbiI6bnVsbCwiZnVlbFBvcnRhbCI6ZmFsc2UsImNhcnJpZXJJbnZpdGUiOmZhbHNlLCJoaWRlUGhvbmVJY29uIjpmYWxzZSwic2hvd1JldmVudWUiOnRydWUsImhhc0NhcnJpZXJQYWNrZXRzIjpmYWxzZSwiaGFzTG9hZHRyYWNrRGFzaGJvYXJkIjowLCJib29rSXROb3dSYXRlS2V5IjoidGFyZ2V0X21pbmltdW1fcGF5Iiwic2Vjb25kYXJ5Ym9va0l0Tm93UmF0ZUtleSI6bnVsbCwiYm9va0l0Tm93UmF0ZUFkanVzdG1lbnQiOm51bGwsImhhc0Z1c2VCaWxsQWNjb3VudCI6dHJ1ZSwiaXNGdXNlQmlsbEV4cGlyZWQiOmZhbHNlLCJmdXNlQmlsbEV4cGlyZURhdGUiOiIyMDIyLTEyLTI4IiwibWNOdW1iZXIiOiJNQzMwOTIwNCIsImN1c3RvbWVyQWNjb3VudElkIjoyOCwiY2FuQ29ubmVjdFRvUHVzaGVyIjp0cnVlLCJwdXNoZXJDbHVzdGVyIjoibXQxIiwiYnJva2VyTG9hZENvbnRhY3RQaCI6IjgxMzM2OTY1MDAiLCJicm9rZXJMb2FkQ29udGFjdEVtYWlsIjoiVHJ1Y2tlclRvb2xPZmZlcnNAUmVlZFRNUy5jb20iLCJzaG93Um91dGVDYXJyaWVycyI6ZmFsc2UsImhhc0xvYWRzdXJlIjoxLCJoYXNQdWJsaXNoVG9DYXJyaWVyIjp0cnVlLCJzaG93Q2FycmllckFjdGl2aXR5VGFiIjp0cnVlLCJjYW5Db3ZlckFuZFRyYWNrTG9hZCI6ZmFsc2V9fX1dLCJmaXJzdE5hbWUiOiJTYXNoYSIsImxhc3ROYW1lIjoiR3JpZXIiLCJ1c2VyRW1haWwiOiJzZ3JpZXJAcmVlZHRtcy5jb20iLCJwaG9uZU51bWJlciI6Iig4MTMpIDM2OS02NDE1In0sImlzcyI6Imh0dHBzOi8vYXV0aC50cnVja2VydG9vbHMuY29tLyIsInN1YiI6ImF1dGgwfDE3NTM3NyIsImF1ZCI6WyJodHRwczovL2FwaS50cnVja2VydG9vbHMuY29tIiwiaHR0cHM6Ly90cnVja2VydG9vbHMudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY3MjI1MTI1NSwiZXhwIjoxNjcyMzM3NjU1LCJhenAiOiIxa1h3emJSRWVFRVplRWJ5ZUFnUGJRVXF2TTN3T1B6eCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.fKQLUAQDdljRyCiqTDd0Gup-cuwoRqCMVafqJO6ohVgqKDXEnwoU5IpDv8-a0QQ3oT5VkfHQeZf1Q31u0r_tgH2zsieLy-vLa-suqCBbQfsy-GrisveOxQrfZeRsWJxfU839SvaGGQeiwtvu4XgUyqxUvACnBUKakLvXb6F2z4j3maoShnM-XW0JaSJEp4GBgfOKpLsi9yV_O9RzXKWqLbLxoqbzMiyZYK17lldw_bo81XeKIvnXxjmep6aLyQY23HtSveQKI0Wn5xQ-Vj-11JGUFTi6FoE_1tRLjFzu-_xLEMZXILpYv44U3uKc8nSgkXBgfWvGgxRRx7o8Tryubw",
      },
      body: JSON.stringify(req),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.availabilities && data.availabilities.length > 0) {
          const tableDataArray = [];
          data.availabilities.forEach((availability) => {
            const carriersObj = {
              key: availability.id,
              id: availability.id,
              name: availability.carrier.companyName,
              mc: availability.carrier.mc,
              eld: availability.carrier.isEldCarrier === 0 ? "No" : "Yes",
              phone: availability.contact_phone,
              email: availability.contact_email,
              network: availability.carrier.isInNetwork === 0 ? "3.5" : "5",
              truck: availability.truckType,
              state: availability.state,
              market: availability.marketName,
              city: availability.city,
            };
            tableDataArray.push(carriersObj);
          });
          setTableData(tableDataArray);
        }
        setTableLoading(false);
      });
  };

  const MarkerBee = (props) => {
    const map = useMap();
    return (
      <Marker
        key={props.market?.id}
        position={[props.market?.lat, props.market?.lon]}
        icon={hqIcon}
        eventHandlers={{
          mouseover: (event) => expandContract(event),
          // onclick: (event) => getMarketDetails(market?.id, market?.lat, market?.lon),
        }}
      >
        <Popup>
          <div
            id="expand-container"
            style={{ cursor: "pointer" }}
            onClick={() =>
              getMarketDetails(
                props.market?.id,
                props.market?.lat,
                props.market?.lon,
                map
              )
            }
          >
            <div id="expand-contract" className="collapsed">
              <h3>{props.market?.name}</h3>
              <div
                style={{
                  width: "120%",
                  position: "absolute",
                  left: "0px",
                  height: "30px",
                  background: "#fda504",
                }}
              ></div>
              <p>{props.market?.pickupAddress}</p>
              <div
                style={{
                  width: "120%",
                  paddingLeft: "25px",
                  position: "absolute",
                  left: "0px",
                  height: "30px",
                  background: "#fda504",
                }}
              >
                {props.market?.market_trucks_count} Trucks :{" "}
                {props.market?.market_loads_count} Loads
              </div>
              <p>
                {props.market?.market_trucks_count}T :{" "}
                {props.market?.market_loads_count}L
              </p>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      center={[35.8054, -90.0241]}
      zoom={5}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      // whenCreated={map => setMap(map)}
    >
      <TileLayer
        url="https://tile.jawg.io/a774b0e4-e02c-422c-9d25-e1d7162d18f1/{z}/{x}/{y}{r}.png?access-token=l96twR2s0qOqqgNxWwS7LQ2zuwwSw5SXCM9WipAB8DHKM2DOxfsHTuUU0y33BN60"
        attribution='&copy; <a href="http://osm.org/copyright">HiveEngine | OpenStreetMap</a> Spencer Grier'
      />

      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">HiveEngine | OpenStreetMap</a> Spencer Grier'
      /> */}
      <nav class="menu">
        <input
          type="checkbox"
          href="#"
          class="menu-open"
          name="menu-open"
          id="menu-open"
        />
        <label class="menu-open-button" for="menu-open">
          <span class="hamburger hamburger-1"></span>
          <span class="hamburger hamburger-2"></span>
          <span class="hamburger hamburger-3"></span>
        </label>

        {/* <a href="#" class="menu-item"> <fa-icon class="fas fa-bar-chart" size="2em"></fa-icon> </a> */}

        <a href="#" class="menu-item" onClick={modalHandler}>
          <div style={{ textAlign: "center", justifyContent: "center" }}>
            <Tooltip content={"Carrier Search"}>
              <FontAwesomeIcon icon={faSearch} size="4em" color="black" />
            </Tooltip>
          </div>
        </a>

        {/* <a href="#" class="menu-item"> <i class="fa fa-heart"></i> </a>
  <a href="#" class="menu-item"> <i class="fa fa-envelope"></i> </a> */}
      </nav>
      {/* <TileLayer
    url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.png'
    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>HiveEngine | OpenStreetMap</a> Spencer Grier"
  /> */}
      {markets?.marketAreas?.map((market, index) => {
        if (market.lat && market.lon) {
          return <MarkerBee key={index} market={market} />;
        }
      })}
      {availabilities?.map((availability, index) => {
        if (availability.lat && availability.lon) {
          return (
            <Marker
              key={availability.id}
              position={[availability.lat, availability.lon]}
              icon={truckIcon}
              eventHandlers={{
                mouseover: (event) => expandContract(event),
                // onclick: (event) => getMarketDetails(market?.id, market?.lat, market?.lon),
              }}
            >
              <Popup>
                <div
                  id="expand-container"
                  style={{ cursor: "pointer" }}
                  // onClick={() =>
                  //   getMarketDetails(
                  //     availability.id,
                  //     availability.lat,
                  //     availability.lon,
                  //     map
                  //   )
                  // }
                >
                  <div id="expand-contract" className="collapsed">
                    <h3>{availability.carrier?.company_name}</h3>
                    <div
                      style={{
                        width: "120%",
                        position: "absolute",
                        left: "0px",
                        height: "30px",
                        background: "#fda504",
                      }}
                    ></div>
                    <p>Availability</p>
                    <div
                      style={{
                        width: "120%",
                        paddingLeft: "25px",
                        position: "absolute",
                        left: "0px",
                        height: "30px",
                        background: "#fda504",
                      }}
                    >
                      {" "}
                      Address : {availability.carrier?.address}
                      Status: {availability.carrier?.csv_status}
                    </div>
                    <p>MC : {availability.carrier?.mc}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        }
      })}
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeModalHandler}
        width="fit-content"
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Carrier{" "}
            <Text b size={18} color={"#fda504"}>
              Search
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body style={{ height: "100%", minHeight: "450px" }}>
          <AsyncSelect
            autoFocus
            cacheOptions
            defaultOptions
            loadOptions={promiseOptions}
            placeholder={"Search city.."}
            value={selectedOption}
            onChange={setSelectedOption}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#f4256d" : "#fda504",
                minWidth: "300px",
                maxWidth: "40%",
                justifyContent: "center",
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                minWidth: "300px",
                maxWidth: "40%",
                color: "#fda504",
                background: "black",
                zIndex: 999999,
              }),
            }}
          />
          <Select
            defaultValue={selectedType}
            onChange={setSetSelectedType}
            options={types}
            isMulti
            placeholder={"Select equipment types.."}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#f4256d" : "#fda504",
                minWidth: "300px",
                maxWidth: "40%",
                justifyContent: "center",
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                minWidth: "300px",
                maxWidth: "40%",
                color: "#fda504",
                background: "black",
                zIndex: 999999,
              }),
            }}
          />
          {tableLoading ? (
            <Loading color="primary" size="xl" textColor="primary"></Loading>
          ) : (
            tableData.length > 0 && (
              <Table
                aria-label="Example table with dynamic content"
                selectionMode="single"
                bordered
                headerLined
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
              >
                <Table.Header columns={columns}>
                  {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                  )}
                </Table.Header>
                <Table.Body items={tableData}>
                  {(item) => (
                    <Table.Row key={item.key}>
                      {(columnKey) => (
                        <Table.Cell>{item[columnKey]}</Table.Cell>
                      )}
                    </Table.Row>
                  )}
                </Table.Body>
                <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={15}
                  onPageChange={(page) => console.log({ page })}
                />
              </Table>
            )
          )}
          {/* <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeModalHandler}>
            Cancel
          </Button>
          <Button auto onClick={() => fetchCarriers(selectedOption)}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </MapContainer>
  );
};

export default Map;
