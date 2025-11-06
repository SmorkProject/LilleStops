import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    height: "100%"
  },
  navigator: {
    padding: 2,
    display: "flex",
    flexDirection: "row",
    borderRadius: 25
  },
  navigatorBox: {
    display: "flex",
    alignItems: "center",
    marginTop: 50
  },
  navigatorButton: {
    borderRadius: 25,
    padding: 10,
    margin: 5
  },
  selected: {
    backgroundColor: "#e2001a",
  },
  search: {
    borderRadius: 25,
    width: "90%",
    padding: 15,
    fontSize: 17
  },
  searchBox: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15
  },
  searchResultBox: {
    width: "90%",
    marginTop: 10,
    borderRadius: 15
  },
  searchResultButton: {
    padding: 15,
    borderRadius: 25,
  },
  searchResultButtonText: {
    fontSize: 17,
    justifyContent: "center",
  },
  resultBox: {
    margin: 15,
    width: "90%",
    padding: 20,
    borderRadius: 15,
  },
  boxBusQuery: {
    display: "flex",
    alignItems: "center",
  },
  resultLine: {
    alignItems: "center",
    borderRadius: 5
  },
  resultLineText: {
    fontSize: 20,
  },
  resultBoxContent: {
    marginTop: 10
  },
  resultBoxContentIn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultBoxContentInButton: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    justifyContent: "center",
  },
  resultBoxContentInButtonText: {
    fontSize: 20,
    justifyContent: "center"
  },
  resultBoxContentInText: {
    fontSize: 17,
    width: "70%"
  },
  resultBoxContentIn2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  vlilleBoxSearch: {
    marginTop: 10,
    alignItems: "center",
  },
  vlilleList: {
    alignItems: "center",
  },
  stationName: {
    fontSize: 17
  },
  stationCity: {
    color: "gray"
  },
  resultBoxContent1:{
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  stats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },
  statContent: {
    display: "flex",
    padding: 18,
    borderRadius: 5,
    alignItems: "center"
  },
  statContentTop: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  statContentText: {
    fontSize: 17,
    margin: 0
  },
  noData: {
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
  }
});