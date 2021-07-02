//
//  ViewController.swift
//  MagisterHuiswerk
//
//  Created by Maarten Wittop Koning on 16/05/2021.
//

//import Cocoa
import SafariServices.SFSafariApplication
import SafariServices.SFSafariExtensionManager

let appName = "MagisterHuiswerk"
let extensionBundleIdentifier = "nl.wittopkoning.MagisterHuiswerk.Extension"

class ViewController: NSViewController {

    @IBOutlet var appNameLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.appNameLabel.stringValue = appName
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: extensionBundleIdentifier) { (state, error) in
            guard let state = state, error == nil else {
                // Insert code to inform the user that something went wrong.
                DispatchQueue.main.async {
                    self.appNameLabel.stringValue = "Er was een error \(String(describing: error))."
                }
                return
            }

            DispatchQueue.main.async {
                if (state.isEnabled) {
                    self.appNameLabel.stringValue = "MagisterHuiswerk's extension is currently on."
                } else {
                    self.appNameLabel.stringValue = "MagisterHuiswerk's extension is currently off. You can turn it on in Safari Extensions preferences."
                }
            }
        }
    }
    
    @IBAction func openSafariExtensionPreferences(_ sender: AnyObject?) {
        SFSafariApplication.showPreferencesForExtension(withIdentifier: extensionBundleIdentifier) { error in
            guard error == nil else {
                // Insert code to inform the user that something went wrong.
                DispatchQueue.main.async {
                    self.appNameLabel.stringValue = "Er was een error Met open knop\(String(describing: error))."
                }
                return
            }

            DispatchQueue.main.async {
                NSApplication.shared.terminate(nil)
            }
        }
    }

}
