//
//  ViewController.swift
//  Appium
//
//  Created by Chu Văn Hưng on 27/10/2021.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var usernameInput: UITextField!
    @IBOutlet weak var passInput: UITextField!
    @IBOutlet weak var textLb: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func onBtnPress(_ sender: Any) {
        let name = usernameInput.text
        let pass = passInput.text
        if name == "admin" && pass == "admin" {
            let vc = HomeVC()
            self.navigationController?.pushViewController(vc, animated: true)
        } else {
            textLb.text = "Đăng nhập không thành công"
        }
    }
    
}

