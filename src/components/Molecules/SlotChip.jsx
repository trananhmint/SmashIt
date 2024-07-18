import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { SIZE } from "../../theme/fonts";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { COLORS } from "../../theme/colors";
  import { toZonedTime, format } from "date-fns-tz";
  
  const SlotChip = ({
    chosenDate,
    courtId,
    isCourtOwner,
    setChosenSlot,
    chosenSlot,
    slotList,
    // bookingSlot,
    setBookingSlotList,
  }) => {
    // const [timeRange, setTimeRange] = useState({ start: "6:00", end: "23:00" });
    const [timeSlots, setTimeSlots] = useState([]);
  
    const vietnamTimeZone = "Asia/Ho_Chi_Minh";
  
    const getCurrentDateTimeInVietnam = (chosenDate) => {
      const zonedDate = toZonedTime(chosenDate, vietnamTimeZone);
      return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
        timeZone: "UTC",
      });
    };
  
    const [slotDetail, setSlotDetail] = useState({
      courtId: courtId,
      timeFrames: [],
      date: chosenDate,
    });
  
    const [bookingSlot, setBookingSlot] = useState([]);
  
    useEffect(() => {
      if (courtId) {
        setSlotDetail({ ...slotDetail, courtId: courtId });
      }
    }, [courtId]);
  
    const filterCourt = (arr, courtId) => {
      return arr.find((court) => court.courtId === courtId);
    };
  
    const handleChooseSlot = (choice) => {
      if (isCourtOwner) {
        if (!chosenSlot || chosenSlot !== choice) {
          setChosenSlot(choice);
        } else {
          setChosenSlot(null);
        }
      } else {
        if (!choice.isBooked) {
          let newTimeFrames = [...slotDetail.timeFrames];
  
          // Check if slotDetail for the courtId exists in bookingSlot
          const existingSlot = filterCourt(bookingSlot, courtId);
  
          if (existingSlot) {
            // Update timeFrames of the existing slotDetail
            if (!existingSlot.timeFrames.includes(choice)) {
              existingSlot.timeFrames.push(choice);
            } else {
              existingSlot.timeFrames = existingSlot.timeFrames.filter(
                (slot) => slot !== choice
              );
            }
            setBookingSlot(
              bookingSlot.map((slot) =>
                slot.courtId === courtId ? existingSlot : slot
              )
            );
          } else {
            // Add new slotDetail to bookingSlot
            if (!newTimeFrames.includes(choice)) {
              newTimeFrames.push(choice);
            }
            setBookingSlot([
              ...bookingSlot,
              { ...slotDetail, timeFrames: newTimeFrames },
            ]);
          }
  
          // Update the slotDetail state with the new timeFrames array
          setSlotDetail({
            ...slotDetail,
            timeFrames: newTimeFrames,
          });
        }
      }
    };
  
    function isTimeFrameMatch(detailsList, choice) {
      // Loop through each detail object in the list
      for (let i = 0; i < detailsList.length; i++) {
        const timeFrames = detailsList[i].timeFrames;
        const checkId = detailsList[i].courtId;
        const checkDate = detailsList[i].date;
  
        // Loop through the timeFrames array within the current detail object
        for (let j = 0; j < timeFrames.length; j++) {
          if (
            timeFrames[j].timeFrame === choice &&
            checkId === courtId &&
            checkDate === chosenDate
          ) {
            return true;
          }
        }
      }
  
      // Return false if no match is found
      return false;
    }
  
    useEffect(() => {
      if (!isCourtOwner) {
        setBookingSlotList([...bookingSlot]);
      }
    }, [bookingSlot]);
  
    useEffect(() => {
      setSlotDetail({
        courtId: courtId,
        timeFrames: [],
        date: chosenDate,
      });
    }, [courtId, chosenDate]);
  
    // const generateTimeIntervals = (startTime, endTime) => {
    //   const intervals = [];
    //   let [startHours, startMinutes] = startTime.split(":").map(Number);
    //   let [endHours, endMinutes] = endTime.split(":").map(Number);
  
    //   let start = new Date();
    //   start.setHours(startHours, startMinutes, 0, 0);
  
    //   let end = new Date();
    //   end.setHours(endHours, endMinutes, 0, 0);
  
    //   // If end time is earlier than start time, add 24 hours to end time
    //   if (end <= start) {
    //     end.setDate(end.getDate() + 1);
    //   }
  
    //   while (start < end) {
    //     const intervalEnd = new Date(start.getTime() + 30 * 60000); // Add 30 minutes
    //     intervals.push({
    //       start: start.toLocaleTimeString([], {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //         hour12: false,
    //       }),
    //       end: intervalEnd.toLocaleTimeString([], {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //         hour12: false,
    //       }),
    //       isOccupied: Math.random() < 0.5,
    //       isChoose: false,
    //     });
    //     start = intervalEnd;
    //   }
  
    //   return intervals;
    // };
  
    // const handleGenerateSlots = () => {
    //   const slots = generateTimeIntervals(timeRange.start, timeRange.end);
    //   setTimeSlots(slots);
    // };
  
    // useEffect(() => {
    //   handleGenerateSlots();
    // }, [timeRange]);
  
    if (isCourtOwner) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.slotContainer}>
              {/* {timeSlots.map((slot, index) => (
              <TouchableOpacity
                onPress={() => handleChooseSlot(slot)}
                activeOpacity={0.7}
                key={index}
                style={[
                  styles.slot,
                  {
                    backgroundColor: slot.isOccupied
                      ? "rgba(117,117,117,0.1)"
                      : slot.isChoose
                      ? COLORS.orangeBackground
                      : "rgba(42,144,131,0.1)",
  
                    borderWidth:
                      chosenSlot?.start === slot.start &&
                      chosenSlot?.end === slot.end
                        ? 1
                        : 0,
  
                    borderColor:
                      chosenSlot?.start === slot.start &&
                      chosenSlot?.end === slot.end &&
                      slot.isOccupied
                        ? COLORS.darkGreyBorder
                        : COLORS.lightGreenText,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    {
                      color: slot.isOccupied
                        ? "#757575"
                        : slot.isChoose
                        ? COLORS.orangeText
                        : "#2A9083",
                    },
                  ]}
                >{`${slot.start} - ${slot.end}`}</Text>
              </TouchableOpacity>
            ))} */}
  
              {slotList?.generateSlotResponseForOwner?.slotWithStatusResponsesForOwner?.map(
                (slot) => (
                  <TouchableOpacity
                    onPress={() => handleChooseSlot(slot)}
                    activeOpacity={0.7}
                    key={slot.id}
                    style={[
                      styles.slot,
                      {
                        backgroundColor: slot?.isBooked
                          ? "rgba(117,117,117,0.1)"
                          : bookingSlot?.length > 0 &&
                            isTimeFrameMatch(bookingSlot, slot.timeFrame)
                          ? COLORS.orangeBackground
                          : "rgba(42,144,131,0.1)",
  
                        borderWidth: chosenSlot === slot ? 1 : 0,
  
                        borderColor:
                          chosenSlot === slot && slot?.isBooked
                            ? COLORS.darkGreyBorder
                            : COLORS.lightGreenText,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.slotText,
                        {
                          color: slot?.isBooked
                            ? "#757575"
                            : bookingSlot?.length > 0 &&
                              isTimeFrameMatch(bookingSlot, slot.timeFrame)
                            ? COLORS.orangeText
                            : "#2A9083",
                        },
                      ]}
                    >
                      {slot.timeFrame}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>
        </View>
      );
    }
  
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={styles.slotContainer}>
            {/* {timeSlots.map((slot, index) => (
              <TouchableOpacity
                onPress={() => handleChooseSlot(slot)}
                activeOpacity={0.7}
                key={index}
                style={[
                  styles.slot,
                  {
                    backgroundColor: slot.isOccupied
                      ? "rgba(117,117,117,0.1)"
                      : slot.isChoose
                      ? COLORS.orangeBackground
                      : "rgba(42,144,131,0.1)",
  
                    borderWidth:
                      chosenSlot?.start === slot.start &&
                      chosenSlot?.end === slot.end
                        ? 1
                        : 0,
  
                    borderColor:
                      chosenSlot?.start === slot.start &&
                      chosenSlot?.end === slot.end &&
                      slot.isOccupied
                        ? COLORS.darkGreyBorder
                        : COLORS.lightGreenText,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    {
                      color: slot.isOccupied
                        ? "#757575"
                        : slot.isChoose
                        ? COLORS.orangeText
                        : "#2A9083",
                    },
                  ]}
                >{`${slot.start} - ${slot.end}`}</Text>
              </TouchableOpacity>
            ))} */}
  
            {slotList?.slotWithStatusResponses?.map((slot) => (
              <TouchableOpacity
                
                onPress={() => handleChooseSlot(slot)}
                activeOpacity={0.7}
                key={slot.id}
                style={[
                  styles.slot,
                  {
                    backgroundColor: slot?.isBooked
                      ? "rgba(117,117,117,0.1)"
                      : bookingSlot?.length > 0 &&
                        isTimeFrameMatch(bookingSlot, slot.timeFrame)
                      ? COLORS.orangeBackground
                      : "rgba(42,144,131,0.1)",
  
                    borderWidth: chosenSlot === slot ? 1 : 0,
  
                    borderColor:
                      chosenSlot === slot && slot?.isBooked
                        ? COLORS.darkGreyBorder
                        : COLORS.lightGreenText,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    {
                      color: slot?.isBooked
                        ? "#757575"
                        : bookingSlot?.length > 0 &&
                          isTimeFrameMatch(bookingSlot, slot.timeFrame)
                        ? COLORS.orangeText
                        : "#2A9083",
                    },
                  ]}
                >
                  {slot.timeFrame}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };
  
  export default SlotChip;
  
  const styles = StyleSheet.create({
    title: {
      fontFamily: "quicksand-semibold",
      fontSize: SIZE.size_20,
    },
    slotContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
    },
    slot: {
      width: "30%",
      padding: 10,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    slotText: {
      fontSize: SIZE.size_14,
      fontFamily: "quicksand-medium",
    },
  });