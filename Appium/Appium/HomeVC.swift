//
//  HomeVC.swift
//  Appium
//
//  Created by Chu Văn Hưng on 27/10/2021.
//

import UIKit

class HomeVC: UIViewController {

    @IBOutlet weak var inputField: UITextField!
    @IBOutlet weak var priceItemLb: UILabel!
    @IBOutlet weak var priceTotalLb: UILabel!
    
    let priceItem = 50000.0
    var priceTotal = 0.0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        priceItemLb.text = "\(priceItem)đ"
    }

    @IBAction func onPress(_ sender: Any) {
        guard let str = inputField.text, let num = Int(str) else {
            priceTotalLb.text = "Tổng giá tiền: 0.0đ"
            return
            
        }
        priceTotal = priceItem * Double(num)
        if num >= 10 {
            priceTotal = priceTotal * 0.9
        } else if num >= 5 {
            priceTotal = priceTotal * 0.95
        }
        
        priceTotalLb.text = "Tổng giá tiền: \(priceTotal)đ"
    }
    

}
