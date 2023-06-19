// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

contract SimpleStorage {
    string public storedData;
    event myEventTest(string eventOutput);

    function set(string memory myText) public {
        storedData = myText;
        emit myEventTest(myText);
    }

    function get() public view returns (string memory) {
        return storedData;
    }
}

// Bu sözleşme, bir string değeri saklamak ve geri döndürmek için kullanılır.

// İşlevler:
// set(string memory myText): Bu işlev, sözleşme içindeki storedData değişkenini günceller. İşlev, myText adında bir string parametre alır ve storedData değişkenine bu değeri atar. Ayrıca, myEventTest adında bir etkinlik tetikler ve myText değerini tetiklenen etkinliğin bir parametresi olarak yayınlar.
// get(): Bu işlev, storedData değişkeninin mevcut değerini döndürür. İşlev, bir string değeri döndürür ve sözleşme üzerinde herhangi bir değişiklik yapmaz.
