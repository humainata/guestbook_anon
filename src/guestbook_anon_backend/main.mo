import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Array "mo:base/Array";

actor {
  type Entry = {
    text : Text;
    timestamp : Int;
  };

  var guestbook : [Entry] = [];

  public func addEntry(text : Text) : async () {
    let entry = {
      text = text;
      timestamp = Time.now();
    };
    guestbook := Array.append(guestbook, [entry]);
  };

  public query func getEntries() : async [Entry] {
    return guestbook;
  };
};
